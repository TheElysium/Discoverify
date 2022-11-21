import axios from "axios";

import {token} from './stores/store'
import {logout} from "@/login";
// import { refresh_token } from './stores/store'

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = 'Bearer ' + token.accessToken;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = () => axios.get('/me');

export const getCurrentUserTopItems = (type, itemNumber, timeRange) => axios.get("/me/top/"+type+"?limit="+itemNumber+"&time_range="+timeRange);

export const getRecommendedTracks = (seed_tracks, seed_artists, limit, min_popularity, min_energy, min_tempo, min_speechiness, max_popularity, max_energy, max_tempo, max_speechiness) => axios.get("/recommendations", {
    params: {
        limit: limit,
        seed_tracks: seed_tracks,
        seed_artists: seed_artists,
        min_popularity: min_popularity,
        max_popularity: max_popularity,
        min_energy: min_energy,
        max_energy: max_energy,
        min_tempo: min_tempo,
        max_tempo: max_tempo,
        min_speechiness: min_speechiness,
        max_speechiness: max_speechiness,
    }
})
    .then(function (response){
        console.log(response.data)
        return response.data;
    });

export const playTrack = (track_uri) => axios.put("me/player/play", {
        uris: track_uri,
        position_ms: 0
})
    .then(function (response){
        console.log(response.data)
    })

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