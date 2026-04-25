import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2><i class="fa fa-sign-in-alt me-2 text-primary"></i>Welcome Back</h2>
      <p class="sub">Login to your EduAdmin India account.</p>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>

        <!-- Email -->
        <div class="mb-3">
          <label for="email">Email Address</label>
          <input id="email" class="form-control mt-1" type="email" name="email"
                 [(ngModel)]="email" placeholder="rahul@gmail.com"
                 required email #emailRef="ngModel"/>
          <div class="err-msg" *ngIf="emailRef.invalid && submitted">Valid email is required.</div>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password">Password</label>
          <input id="password" class="form-control mt-1" type="password" name="password"
                 [(ngModel)]="password" placeholder="Your password"
                 required #pwdRef="ngModel"/>
          <div class="err-msg" *ngIf="pwdRef.invalid && submitted">Password is required.</div>
        </div>

        <button type="submit" class="btn-edu">
          <i class="fa fa-sign-in-alt me-2"></i>Login
        </button>

        <div class="alert-edu alert-danger mt-2" *ngIf="errorMsg">{{ errorMsg }}</div>
      </form>

      <p class="foot-link">New user? <a routerLink="/register">Register here</a></p>
    </div>
  `
})
export class LoginComponent {
  email     = '';
  password  = '';
  submitted = false;
  errorMsg  = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(f: NgForm) {
    this.submitted = true;
    this.errorMsg  = '';
    if (f.invalid) return;

    const result = this.auth.login(this.email, this.password);
    if (result.success) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMsg = result.message;
    }
  }
}
