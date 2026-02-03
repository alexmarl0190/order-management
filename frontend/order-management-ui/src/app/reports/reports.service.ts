import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environment/environment'
import { Observable } from 'rxjs'

export interface Report {
    id: number
    name: string
    file_path: string
    status?: 'active' | 'inactive'
}


@Injectable({ providedIn: 'root' })
export class ReportsService {

    private api = environment.apiUrl

    constructor(private http: HttpClient) { }

    getReports(): Observable<Report[]> {
        return this.http.get<Report[]>(`${this.api}/reports`)
    }

    createReport(data: { name: string; file_path: string }) {
        return this.http.post(`${this.api}/reports`, data)
    }

    downloadReport(id: number) {
        return this.http.get(
            `${this.api}/reports/${id}/download`,
            { responseType: 'blob' }
        )
    }
}
