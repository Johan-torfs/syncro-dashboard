import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../admin/user/user';
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

  getUser(): User | null {
    if (this.isLoggedIn()) {
      return {
        id: parseInt(localStorage.getItem('id') ?? '0'),
        email: localStorage.getItem('email') ?? '', 
        password: '',
        token: this.getToken()
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

  authenticate(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('http://localhost:3000/login', user);
  }

  register(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('http://localhost:3000/register', user);
  }
}