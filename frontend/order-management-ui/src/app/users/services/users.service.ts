import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {

    private api = environment.apiUrl

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.api}/users/`)
    }

    createUser(data: any) {
        return this.http.post(`${this.api}/users/`, data)
    }

    updateUser(id: number, data: any) {
        return this.http.put(`${this.api}/users/${id}`, data)
    }

    deactivateUser(id: number) {
        return this.http.delete(`${this.api}/users/${id}`)
    }

    activateUser(id: number) {
        return this.http.put(
            `${this.api}/users/${id}/activate`,
            {}
        )
    }

}
