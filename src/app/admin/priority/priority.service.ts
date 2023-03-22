import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from './priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private httpClient: HttpClient) { }

  getPriorities(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>("http://localhost:3000/priorities");
  }

  getPriorityById(id: number): Observable<Priority> {
    return this.httpClient.get<Priority>("http://localhost:3000/priorities/" + id);
  }

  postPriority(priority: Priority): Observable<Priority> {
      return this.httpClient.post<Priority>("http://localhost:3000/priorities", priority);
  }

  patchPriority(id:number, priority: Priority): Observable<Priority> {
      return this.httpClient.patch<Priority>("http://localhost:3000/priorities/" + id, priority);
  }

  deletePriority(id: number): Observable<Priority> {
      return this.httpClient.delete<Priority>("http://localhost:3000/priorities/" + id);
  }
}
