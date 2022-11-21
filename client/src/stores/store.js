import { reactive } from 'vue'

export const filters = reactive({
    popularity:{
        min:0,
        max:100
    },
    energy:{
        min:0,
        max:100
    },
    tempo:{
        min:0,
        max:100
    },
    vocals:{
        min:0,
        max:100
    },

    setPopularity(min, max){
        this.popularity.min = min;
        this.popularity.max = max;
    },
    setEnergy(min, max){
        this.energy.min = min;
        this.energy.max = max;
    },
    setTempo(min, max){
        this.tempo.min = min;
        this.tempo.max = max;
    },
    setVocals(min, max){
        this.vocals.min = min;
        this.vocals.max = max;
    },
})

export const selected = reactive({
    artists: [],
    tracks: [],
    setArtists(a){
        this.artists = a
    },
    setTracks(a){
        this.tracks = a
    },
})

export const token = reactive({
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    timestamp: null,

    setAccessToken(newAccessToken) {
        this.accessToken = newAccessToken;
    },
    setRefreshToken(newRefreshToken) {
        this.refreshToken = newRefreshToken;
    },
    setExpiresIn(newExpirationTime) {
        this.expiresIn = newExpirationTime;
    },
    setTimestamp(newTimestamp) {
        this.timestamp = newTimestamp;
    }
})


export const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
export const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};