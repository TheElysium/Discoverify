import { reactive } from 'vue'

export const token = reactive({
    token: null,
    setToken(newToken) {
        this.token = newToken;
    }
})
