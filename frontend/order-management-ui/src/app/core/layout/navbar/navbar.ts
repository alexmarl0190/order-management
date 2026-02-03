import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { TokenService } from '../../services/token.service'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { RouterLink } from '@angular/router'
import { UserService, User } from '../../services/user.service'
import { filter, Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { HostListener, ElementRef } from '@angular/core'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  user$!: Observable<User>

  isSidebarOpen = true
  isUserMenuOpen = false

  pageTitle = 'Home'

  constructor(
    private auth: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.isUserMenuOpen = false

    this.user$ = this.userService.getMe()
    this.pageTitle = this.getRouteTitle(this.activatedRoute)

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle = this.getRouteTitle(this.activatedRoute)
        this.isUserMenuOpen = false
      })
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isUserMenuOpen) return

    const clickedInside = this.elementRef.nativeElement.contains(event.target)
    if (!clickedInside) {
      this.isUserMenuOpen = false
    }
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.tokenService.clear()
      this.router.navigate(['/login'])
    })
  }

  private getRouteTitle(route: ActivatedRoute): string {
    let currentRoute = route
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild
    }
    return currentRoute.snapshot.data['title'] || 'Home'
  }
}
