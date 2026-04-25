import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  password: string;       // stored hashed (simulated)
  createdAt: string;
}

export interface RegisterData {
  name: string; email: string; phone: string;
  department: string; role: string; password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private USERS_KEY   = 'edu_users';
  private SESSION_KEY = 'edu_session';   // stores logged-in user id

  // ── Helpers ────────────────────────────────────────────────────
  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
  private saveUsers(users: User[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // ── Register ───────────────────────────────────────────────────
  register(data: RegisterData): { success: boolean; message: string } {
    const users = this.getUsers();
    if (users.find(u => u.email === data.email))
      return { success: false, message: 'Email already registered.' };

    // Simple hash simulation (use bcrypt on a real backend)
    const user: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      role: data.role,
      password: btoa(data.password),   // base64 — demo only
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    users.push(user);
    this.saveUsers(users);
    return { success: true, message: 'Registration successful!' };
  }

  // ── Login ──────────────────────────────────────────────────────
  login(email: string, password: string): { success: boolean; message: string } {
    const user = this.getUsers().find(u => u.email === email);
    if (!user) return { success: false, message: 'User not found.' };
    if (user.password !== btoa(password))
      return { success: false, message: 'Incorrect password.' };

    localStorage.setItem(this.SESSION_KEY, String(user.id));
    return { success: true, message: 'Login successful!' };
  }

  // ── Profile ────────────────────────────────────────────────────
  getProfile(): User | null {
    const id = localStorage.getItem(this.SESSION_KEY);
    if (!id) return null;
    const user = this.getUsers().find(u => u.id === Number(id));
    return user ?? null;
  }

  // ── Auth state ─────────────────────────────────────────────────
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
