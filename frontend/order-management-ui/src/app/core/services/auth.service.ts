import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import { TokenService } from './token.service'

interface LoginResponse {
    accessToken: string
    refreshToken: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private api = environment.apiUrl

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    login(email: string, password: string) {
        return this.http.post<LoginResponse>(`${this.api}/auth/login`, {
            email,
            password
        })
    }

    refreshToken() {
        return this.http.post<{ accessToken: string }>(
            `${this.api}/auth/refresh`,
            {
                refreshToken: this.tokenService.getRefreshToken()
            }
        )
    }

    logout() {
        return this.http.post(`${this.api}/auth/logout`, {})
    }

    saveSession(tokens: LoginResponse) {
        this.tokenService.setTokens(tokens.accessToken, tokens.refreshToken)
    }
}
