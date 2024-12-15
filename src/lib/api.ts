import { ProfileResponse } from "../types/api";

const params = new URLSearchParams(window.location.search)

const config = {
    token: params.get('token'),
    apiUrl: params.get('apiUrl'),
}

const api = {
    get uri(): string {
        return config.apiUrl;
    },
    getProfile: async function() {
        const url = new URL(`${config.apiUrl}/profile`)
        url.searchParams.append('token', config.token)
        const data: ProfileResponse = await fetch(url).then(r => r.json())
        if ('error' in data) {
            throw data
        }
        return data.profile
    },
}

export { api }
