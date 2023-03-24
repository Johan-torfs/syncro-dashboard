import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:3000/users");
  }

  getCustomers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:3000/users/all/customer");
  }

  getTechnicians(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:3000/users/all/technician");
  }

  getAdmins(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:3000/users/all/admin");
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:3000/users/" + id);
  }

  postUser(user: User): Observable<User> {
      return this.httpClient.post<User>("http://localhost:3000/users", user);
  }

  patchUser(id:number, user: User): Observable<User> {
      return this.httpClient.patch<User>("http://localhost:3000/users/" + id, user);
  }

  deleteUser(id: number): Observable<User> {
      return this.httpClient.delete<User>("http://localhost:3000/users/" + id);
  }
}
