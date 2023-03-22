import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../admin/user/userLogin';
import { UserResponse } from '../admin/user/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): UserLogin | null {
    if (this.isLoggedIn()) {
      return {
        id: parseInt(localStorage.getItem('id') ?? '0'),
        email: localStorage.getItem('email') ?? '', 
        password: '',
        token: this.getToken(),
        role: localStorage.getItem('role') ?? ''
      };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isHasOneOfRoles(roles: string[] = []): boolean {
    if (roles.length === 0) return true;

    let userRole = localStorage.getItem('role');
    if (!userRole) return false;

    for (let index in roles) {
      if (roles[index] === userRole) return true;
    }

    return false;
  }

  authenticate(user: UserLogin): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('http://localhost:3000/auth/login', user);
  }

  register(user: UserLogin): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('http://localhost:3000/auth/register', user);
  }
}