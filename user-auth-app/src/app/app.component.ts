import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Navbar -->
    <nav class="navbar-edu">
      <a class="brand" routerLink="/">
        <i class="fa-solid fa-graduation-cap me-2"></i>Edu<span>Admin</span>
      </a>
      <div class="nav-links">
        <ng-container *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login"    routerLinkActive="active">
            <i class="fa fa-sign-in-alt me-1"></i>Login
          </a>
          <a routerLink="/register" routerLinkActive="active">
            <i class="fa fa-user-plus me-1"></i>Register
          </a>
        </ng-container>
        <ng-container *ngIf="authService.isLoggedIn()">
          <a routerLink="/profile" routerLinkActive="active">
            <i class="fa fa-user-circle me-1"></i>Profile
          </a>
          <a class="logout" href="#" (click)="logout($event)">
            <i class="fa fa-sign-out-alt me-1"></i>Logout
          </a>
        </ng-container>
      </div>
    </nav>

    <router-outlet/>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
