import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = ''
  password = ''
  error = ''

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login() {
    this.auth.login(this.email, this.password)
      .subscribe({
        next: res => {
          this.auth.saveSession(res)
          this.router.navigate(['/'])
        },
        error: () => this.toastr.error('Usuario o contraseña incorrectos', 'Error')
      })
  }

  showPassword = false

  togglePassword() {
    this.showPassword = !this.showPassword
  }

}
