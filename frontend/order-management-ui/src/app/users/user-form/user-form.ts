import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { User } from '../models/user.model'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  @Input() user?: User
  @Output() save = new EventEmitter<any>()
  @Output() close = new EventEmitter<void>()

  showPassword = false
  showConfirmPassword = false
  passwordError = false

  form = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    status: 'active',
  }

  ngOnInit() {
    if (this.user) {
      this.form = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: '',
        confirmPassword: '',
        role: this.user.role,
        status: this.user.status,
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  submit() {
    if (!this.user) {
      if (!this.form.password || this.form.password !== this.form.confirmPassword) {
        this.passwordError = true
        return
      }
    }

    this.passwordError = false

    const { confirmPassword, ...payload } = this.form
    this.save.emit(payload)
  }
}
