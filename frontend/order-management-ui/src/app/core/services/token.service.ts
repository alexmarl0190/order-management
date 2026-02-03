import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class TokenService {

    private ACCESS_TOKEN = 'access_token'
    private REFRESH_TOKEN = 'refresh_token'

    setTokens(access: string, refresh: string) {
        localStorage.setItem(this.ACCESS_TOKEN, access)
        localStorage.setItem(this.REFRESH_TOKEN, refresh)
    }

    setAccessToken(token: string) {
        localStorage.setItem(this.ACCESS_TOKEN, token)
    }

    getAccessToken() {
        return localStorage.getItem(this.ACCESS_TOKEN)
    }

    getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN)
    }

    clear() {
        localStorage.clear()
    }

    isLoggedIn(): boolean {
        return !!this.getAccessToken()
    }
}
