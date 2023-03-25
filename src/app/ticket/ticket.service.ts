import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:3000/tickets");
  }

  getTicketsFromDate(date: Date): Observable<Ticket[]> {
    let dateNumber = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();    
    return timer(1, 30000).pipe(switchMap(() => this.httpClient.get<Ticket[]>("http://localhost:3000/tickets/fromDate/" + dateNumber)));
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>("http://localhost:3000/tickets/" + id);
  }

  postTicket(ticket: Ticket): Observable<Ticket> {
      return this.httpClient.post<Ticket>("http://localhost:3000/tickets", ticket);
  }

  patchTicket(id:number, ticket: Ticket): Observable<Ticket> {
      return this.httpClient.patch<Ticket>("http://localhost:3000/tickets/" + id, ticket);
  }

  patchTicketStatus(id:number, status: string): Observable<Ticket> {
    return this.httpClient.patch<Ticket>("http://localhost:3000/tickets/status/" + id, {status: status});
}

  deleteTicket(id: number): Observable<Ticket> {
      return this.httpClient.delete<Ticket>("http://localhost:3000/tickets/" + id);
  }
}
