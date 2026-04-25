import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-card" *ngIf="user; else noUser">

      <!-- Avatar + Name -->
      <div class="profile-avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
      <div class="profile-name">{{ user.name }}</div>
      <div class="profile-email">{{ user.email }}</div>

      <!-- Role badge -->
      <span class="badge-role"
        [style.background]="roleBg(user.role)"
        [style.color]="roleColor(user.role)">
        <i class="fa fa-circle me-1" style="font-size:.55rem"></i>{{ user.role }}
      </span>

      <!-- Info grid -->
      <div class="info-grid">
        <div class="info-box">
          <div class="lbl"><i class="fa fa-phone me-1"></i>Mobile</div>
          <div class="val">{{ user.phone || '—' }}</div>
        </div>
        <div class="info-box">
          <div class="lbl"><i class="fa fa-building me-1"></i>Department</div>
          <div class="val">{{ user.department || '—' }}</div>
        </div>
        <div class="info-box">
          <div class="lbl"><i class="fa fa-id-badge me-1"></i>User ID</div>
          <div class="val">#{{ user.id }}</div>
        </div>
        <div class="info-box">
          <div class="lbl"><i class="fa fa-calendar me-1"></i>Registered On</div>
          <div class="val">{{ user.createdAt }}</div>
        </div>
      </div>

      <!-- Logout -->
      <button class="btn-edu danger" (click)="logout()">
        <i class="fa fa-sign-out-alt me-2"></i>Logout
      </button>
    </div>

    <ng-template #noUser>
      <div class="auth-card text-center">
        <i class="fa fa-exclamation-circle fa-2x text-danger mb-3"></i>
        <p>Session not found. Please login again.</p>
        <a routerLink="/login" class="btn-edu d-inline-block mt-2"
           style="text-decoration:none;width:auto;padding:10px 28px">
          Go to Login
        </a>
      </div>
    </ng-template>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getProfile();
    if (!this.user) this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  roleBg(role: string): string {
    const map: Record<string, string> = {
      Student: '#ebf4ff', Faculty: '#f0fff4', Admin: '#fff5f5'
    };
    return map[role] ?? '#f7f9fc';
  }

  roleColor(role: string): string {
    const map: Record<string, string> = {
      Student: '#2b6cb0', Faculty: '#276749', Admin: '#9b2c2c'
    };
    return map[role] ?? '#4a5568';
  }
}
