import { reactive } from 'vue'

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