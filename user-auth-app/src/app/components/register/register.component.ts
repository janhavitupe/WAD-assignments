import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2><i class="fa fa-user-plus me-2 text-primary"></i>Create Account</h2>
      <p class="sub">Register as a student or faculty member of EduAdmin India.</p>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>

        <!-- Name -->
        <div class="mb-3">
          <label for="name">Full Name</label>
          <input id="name" class="form-control mt-1" name="name"
                 [(ngModel)]="form.name" placeholder="e.g. Rahul Sharma"
                 required #name="ngModel"/>
          <div class="err-msg" *ngIf="name.invalid && submitted">Full name is required.</div>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email">Email Address</label>
          <input id="email" class="form-control mt-1" type="email" name="email"
                 [(ngModel)]="form.email" placeholder="rahul@gmail.com"
                 required email #email="ngModel"/>
          <div class="err-msg" *ngIf="email.invalid && submitted">Valid email is required.</div>
        </div>

        <!-- Phone -->
        <div class="mb-3">
          <label for="phone">Mobile Number</label>
          <input id="phone" class="form-control mt-1" type="tel" name="phone"
                 [(ngModel)]="form.phone" placeholder="+91 XXXXX XXXXX"
                 pattern="[6-9][0-9]{9}" required #phone="ngModel"/>
          <div class="err-msg" *ngIf="phone.invalid && submitted">
            Valid Indian mobile number required (starts with 6–9).
          </div>
        </div>

        <!-- Role + Department -->
        <div class="row">
          <div class="col-6 mb-3">
            <label for="role">Role</label>
            <select id="role" class="form-select mt-1" name="role"
                    [(ngModel)]="form.role" required #role="ngModel">
              <option value="">-- Select --</option>
              <option>Student</option>
              <option>Faculty</option>
              <option>Admin</option>
            </select>
            <div class="err-msg" *ngIf="role.invalid && submitted">Select a role.</div>
          </div>
          <div class="col-6 mb-3">
            <label for="dept">Department</label>
            <select id="dept" class="form-select mt-1" name="department"
                    [(ngModel)]="form.department" required #dept="ngModel">
              <option value="">-- Select --</option>
              <option>Computer Science &amp; Engineering</option>
              <option>Electronics &amp; Communication</option>
              <option>Mechanical Engineering</option>
              <option>Civil Engineering</option>
              <option>MBA</option>
            </select>
            <div class="err-msg" *ngIf="dept.invalid && submitted">Select a department.</div>
          </div>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password">Password</label>
          <input id="password" class="form-control mt-1" type="password" name="password"
                 [(ngModel)]="form.password" placeholder="Min 6 characters"
                 minlength="6" required #pwd="ngModel"/>
          <div class="err-msg" *ngIf="pwd.invalid && submitted">Minimum 6 characters required.</div>
        </div>

        <button type="submit" class="btn-edu">
          <i class="fa fa-paper-plane me-2"></i>Register
        </button>

        <div class="alert-edu alert-success" *ngIf="successMsg">{{ successMsg }}</div>
        <div class="alert-edu alert-danger"  *ngIf="errorMsg">{{ errorMsg }}</div>
      </form>

      <p class="foot-link">Already have an account? <a routerLink="/login">Login here</a></p>
    </div>
  `
})
export class RegisterComponent {
  form: RegisterData = { name:'', email:'', phone:'', department:'', role:'', password:'' };
  submitted  = false;
  successMsg = '';
  errorMsg   = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(f: NgForm) {
    this.submitted  = true;
    this.successMsg = '';
    this.errorMsg   = '';

    if (f.invalid) return;

    const result = this.auth.register(this.form);
    if (result.success) {
      this.successMsg = result.message + ' Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 1800);
    } else {
      this.errorMsg = result.message;
    }
  }
}
