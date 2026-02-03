import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import { Observable } from 'rxjs'

export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private api = environment.apiUrl

    constructor(private http: HttpClient) { }

    getMe(): Observable<User> {
        return this.http.get<User>(`${this.api}/auth/me`);
    }
}
