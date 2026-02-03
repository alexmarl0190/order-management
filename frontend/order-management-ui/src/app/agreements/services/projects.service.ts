import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environment/environment'

export interface Project {
    id: number
    code: string
    name: string
    description?: string
    status: 'active' | 'inactive'
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {

    private api = environment.apiUrl

    constructor(private http: HttpClient) { }

    // Lista completa (admin)
    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.api}/projects`)
    }

    // Solo activos (selects)
    getActiveProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.api}/projects/active`)
    }

    // Crear proyecto
    createProject(data: {
        code: string
        name: string
        description?: string
    }) {
        return this.http.post(`${this.api}/projects`, data)
    }

    // Desactivar proyecto
    deactivateProject(id: number) {
        return this.http.delete(`${this.api}/projects/${id}`)
    }

    // Activar proyecto
    activateProject(id: number) {
        return this.http.put(`${this.api}/projects/${id}/activate`, {})
    }
}
