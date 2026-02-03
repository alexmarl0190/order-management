import { Component, OnInit, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import {
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  FlexRenderDirective,
} from '@tanstack/angular-table'

import { AgreementsService, GlobalAgreement } from '../agreements/services/agreements.service'
import { ProjectsService, Project } from '../agreements/services/projects.service'

@Component({
  selector: 'app-agreements',
  standalone: true,
  imports: [CommonModule, FormsModule, FlexRenderDirective],
  templateUrl: './agreements.html',
  styleUrl: './agreements.scss',
})
export class Agreements implements OnInit {

  agreements = signal<GlobalAgreement[]>([])
  projects = signal<Project[]>([])

  search = signal('')
  statusFilter = signal<'all' | 'active' | 'inactive'>('all')

  showForm = signal(false)

  form = signal({
    agreement_key: '',
    name: '',
    project_id: null as number | null,
  })

  constructor(
    private agreementsService: AgreementsService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.loadAgreements()
    this.loadProjects()
  }

  loadAgreements() {
    this.agreementsService.getAgreements()
      .subscribe(data => this.agreements.set(data))
  }

  loadProjects() {
    this.projectsService.getActiveProjects()
      .subscribe(data => this.projects.set(data))
  }

  // FILTRO
  filteredAgreements = computed(() =>
    this.agreements().filter(a => {
      const text =
        `${a.name} ${a.project_name} ${a.agreement_key}`.toLowerCase()

      const matchesSearch =
        text.includes(this.search().toLowerCase())

      const matchesStatus =
        this.statusFilter() === 'all' ||
        a.status === this.statusFilter()

      return matchesSearch && matchesStatus
    })
  )

  // COLUMNAS
  columns: ColumnDef<GlobalAgreement>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'project_name',
      header: 'Proyecto',
    },
    {
      accessorKey: 'agreement_key',
      header: 'ID Acuerdo',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ctx => ctx.row.original,
    },
  ]

  // TANSTACK
  table = createAngularTable(() => ({
    data: this.filteredAgreements(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  }))

  // ACTIONS
  openCreate() {
    this.form.set({
      agreement_key: '',
      name: '',
      project_id: null,
    })
    this.showForm.set(true)
  }

  saveAgreement() {
    const data = this.form()

    if (!data.agreement_key || !data.name || !data.project_id) {
      alert('Todos los campos son obligatorios')
      return
    }

    this.agreementsService.createAgreement(data).subscribe({
      next: () => {
        this.showForm.set(false)
        this.loadAgreements()
      },
      error: err => {
        if (err.status === 409) {
          alert('Ese ID de acuerdo ya existe')
        }
      },
    })
  }

  toggleStatus(agreement: GlobalAgreement) {
    const action =
      agreement.status === 'active'
        ? this.agreementsService.deactivateAgreement(agreement.id)
        : this.agreementsService.activateAgreement(agreement.id)

    action.subscribe(() => this.loadAgreements())
  }
}
