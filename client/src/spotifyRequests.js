import axios from "axios";

import {accessToken} from "@/login";

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
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
