import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environment/environment'

export interface GlobalAgreement {
    id: number
    agreement_key: string
    name: string
    project_name: string
    status: 'active' | 'inactive'
}

@Injectable({ providedIn: 'root' })
export class AgreementsService {

    private api = environment.apiUrl

    constructor(private http: HttpClient) { }

    getAgreements(): Observable<GlobalAgreement[]> {
        return this.http.get<GlobalAgreement[]>(`${this.api}/agreements`)
    }

    createAgreement(data: any) {
        return this.http.post(`${this.api}/agreements`, data)
    }

    activateAgreement(id: number) {
        return this.http.put(`${this.api}/agreements/${id}/activate`, {})
    }

    deactivateAgreement(id: number) {
        return this.http.delete(`${this.api}/agreements/${id}`)
    }
}
