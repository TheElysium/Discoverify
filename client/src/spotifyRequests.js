import axios from "axios";

import {token} from './stores/store'
import {logout} from "@/login";
// import { refresh_token } from './stores/store'

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = 'Bearer ' + token.accessToken;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = () => axios.get('/me');

export const getCurrentUserTopItems = (type, itemNumber, timeRange) => axios.get("/me/top/"+type+"?limit="+itemNumber+"&time_range="+timeRange);

export const refreshToken = async () => {
    try {
        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        if (!token.refreshToken ||
            token.refreshToken === 'undefined' ||
            (Date.now() - Number(token.timestamp) / 1000) < 1000
        ) {
            console.error('No refresh token available');
            logout();
        }

        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${token.refreshToken}`);

        // Update localStorage values
        token.setAccessToken(data.access_token);
        token.setTimestamp(Date.now());

        // Reload the page for localStorage updates to be reflected
        window.location.reload();

    } catch (e) {
        console.error(e);
    }
};