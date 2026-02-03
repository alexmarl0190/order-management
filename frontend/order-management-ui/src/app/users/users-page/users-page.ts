import { Component, signal, computed, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UsersService } from '../services/users.service'
import { User } from '../models/user.model'
import { UserForm } from '../user-form/user-form'

import {
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  FlexRenderDirective,
} from '@tanstack/angular-table'

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, FormsModule, UserForm, FlexRenderDirective],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {

  users = signal<User[]>([])
  search = signal('')
  statusFilter = signal<'all' | 'active' | 'inactive'>('all')

  showForm = signal(false)
  editingUser = signal<User | undefined>(undefined)

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users.set(users)
      console.log(users)
    })
  }

  // FILTRADO
  filteredUsers = computed(() =>
    this.users().filter(u => {
      const text = `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase()
      const searchMatch = text.includes(this.search().toLowerCase())
      const statusMatch =
        this.statusFilter() === 'all' || u.status === this.statusFilter()
      return searchMatch && statusMatch
    })
  )

  // COLUMNAS
  columns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: 'Nombre',
      accessorFn: row => `${row.first_name}`,
    },
    {
      id: 'username',
      header: 'Usuario',
      accessorFn: row => `${row.first_name} ${row.last_name}`,
    },
    {
      accessorKey: 'email',
      header: 'Correo',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      accessorKey: 'role',
      header: 'Rol',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ctx => ctx.row.original,
    },
  ]



  // TANSTACK
  table = createAngularTable(() => ({
    data: this.filteredUsers(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  }))

  // ACTIONS
  openCreate() {
    this.editingUser.set(undefined)
    this.showForm.set(true)
  }

  openEdit(user: User) {
    this.editingUser.set(user)
    this.showForm.set(true)
  }

  deactivate(user: User) {
    if (!confirm(`Desactivar a ${user.first_name}?`)) return
    this.usersService.deactivateUser(user.id).subscribe(() => this.loadUsers())
  }

  activate(user: User) {
    if (!confirm(`Activar a ${user.first_name}?`)) return
    this.usersService.activateUser(user.id).subscribe(() => this.loadUsers())
  }

  saveUser(data: any) {
    const request = this.editingUser()
      ? this.usersService.updateUser(this.editingUser()!.id, data)
      : this.usersService.createUser(data)

    request.subscribe(() => {
      this.showForm.set(false)
      this.loadUsers()
    })
  }
}
