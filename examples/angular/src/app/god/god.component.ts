import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  active: boolean;
  lastLoginAt: string | null;
};

type RoleFilter = 'all' | 'admin' | 'editor' | 'viewer';

@Component({
  selector: 'app-god',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './god.component.html',
  styleUrl: './god.component.css',
})
export class GodComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  search = '';
  roleFilter: RoleFilter = 'all';

  selected = new Set<string>();

  editing: User | null = null;
  editName = '';
  editEmail = '';
  editRole: User['role'] = 'viewer';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('/api/users').subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = e.message ?? 'Failed to load users';
        this.loading = false;
      },
    });
  }

  get filtered(): User[] {
    return this.users.filter((u) => {
      if (this.roleFilter !== 'all' && u.role !== this.roleFilter) return false;
      if (
        this.search &&
        !u.name.toLowerCase().includes(this.search.toLowerCase()) &&
        !u.email.toLowerCase().includes(this.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }

  isAllSelected(): boolean {
    return this.selected.size === this.filtered.length && this.filtered.length > 0;
  }

  toggleSelected(id: string) {
    if (this.selected.has(id)) {
      this.selected.delete(id);
    } else {
      this.selected.add(id);
    }
    this.selected = new Set(this.selected);
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selected = new Set();
    } else {
      this.selected = new Set(this.filtered.map((u) => u.id));
    }
  }

  isSelected(id: string): boolean {
    return this.selected.has(id);
  }

  openEdit(user: User) {
    this.editing = user;
    this.editName = user.name;
    this.editEmail = user.email;
    this.editRole = user.role;
  }

  closeEdit() {
    this.editing = null;
  }

  saveEdit() {
    this.closeEdit();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  getRoleBadgeStyle(role: User['role']): Record<string, string> {
    const styles: Record<User['role'], Record<string, string>> = {
      admin: { background: '#fde2e2', color: '#a4262c' },
      editor: { background: '#fff4d4', color: '#8a6d1a' },
      viewer: { background: '#e2ecfd', color: '#1f4ea8' },
    };
    return styles[role];
  }

  getStatusClass(user: User): string {
    if (!user.active) return 'pill pill-inactive';
    if (!user.lastLoginAt) return 'pill pill-pending';
    const ms = Date.now() - new Date(user.lastLoginAt).getTime();
    if (ms > 30 * 24 * 60 * 60 * 1000) return 'pill pill-stale';
    return 'pill pill-active';
  }

  getStatusLabel(user: User): string {
    if (!user.active) return 'Inactive';
    if (!user.lastLoginAt) return 'Never logged in';
    const ms = Date.now() - new Date(user.lastLoginAt).getTime();
    if (ms > 30 * 24 * 60 * 60 * 1000) return 'Stale';
    return 'Active';
  }

  getLastLogin(lastLoginAt: string | null): string {
    if (!lastLoginAt) return '—';
    const ms = Date.now() - new Date(lastLoginAt).getTime();
    const min = Math.floor(ms / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return min + 'm ago';
    const hr = Math.floor(min / 60);
    if (hr < 24) return hr + 'h ago';
    const d = Math.floor(hr / 24);
    if (d < 30) return d + 'd ago';
    const mo = Math.floor(d / 30);
    return mo + 'mo ago';
  }

  deactivateSelected() {
    alert('Pretend we deactivated ' + this.selected.size + ' users');
  }

  deactivateUser(user: User) {
    alert('Pretend we deactivated ' + user.name);
  }
}
