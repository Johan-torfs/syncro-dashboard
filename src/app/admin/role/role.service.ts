import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>("http://localhost:3000/roles");
  }

  getRoleById(id: number): Observable<Role> {
    return this.httpClient.get<Role>("http://localhost:3000/roles/" + id);
  }

  postRole(role: Role): Observable<Role> {
      return this.httpClient.post<Role>("http://localhost:3000/roles", role);
  }

  putRole(id:number, role: Role): Observable<Role> {
      return this.httpClient.put<Role>("http://localhost:3000/roles/" + id, role);
  }

  deleteRole(id: number): Observable<Role> {
      return this.httpClient.delete<Role>("http://localhost:3000/roles/" + id);
  }
}
