import {token} from "@/stores/store";
import {refreshToken} from "@/spotifyRequests";
import axios from "axios";

export const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        accessToken: urlParams.get('access_token'),
        refreshToken: urlParams.get('refresh_token'),
        expireTime: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
    console.log(queryParams);

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || token.accessToken === 'undefined') {
        refreshToken();
    }

    // If there is a valid access token in localStorage, use that
    if (token.accessToken && token.accessToken !== 'undefined') {
        return token.accessToken;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams["accessToken"]) {
        // Store the query params in localStorage

        token.setAccessToken(queryParams["accessToken"])
        axios.defaults.headers['Authorization'] = 'Bearer ' + token.accessToken;

        token.setRefreshToken(queryParams["refreshToken"])
        token.setExpiresIn(queryParams["expireTime"])
        // Set timestamp
        token.setTimestamp(Date.now())
        // Return access token from query params
        return token.accessToken;
    }

    // We should never get here!
    return false;
};

const hasTokenExpired = () => {
    if (!token.accessToken || !token.timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(token.timestamp);
    return (millisecondsElapsed / 1000) > Number(token.expiresIn);
};

export const logout = () => {
    // Clear all localStorage items
    token.setAccessToken(null)
    token.setRefreshToken(null)
    token.setExpiresIn(null)
    // Navigate to homepage
    window.location = window.location.origin;
};