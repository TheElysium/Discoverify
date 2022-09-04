import { reactive } from 'vue'

export const access_token = reactive({
    access_token: null,
    setAccessToken(newAccessToken) {
        this.access_token = newAccessToken;
    }
})

export const refresh_token = reactive({
    refresh_token: null,
    setRefreshToken(newAccessToken) {
        this.refresh_token = newAccessToken;
    }
})
