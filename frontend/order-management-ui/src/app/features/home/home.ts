import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService, User } from '../../core/services/user.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  user$: Observable<User>

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.getMe()
  }

  navigateToUsers() {
    this.router.navigate(['/users'])
  }

  navigateToReports() {
    this.router.navigate(['/reports'])
  }
}
