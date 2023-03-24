import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:3000/tickets");
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

  deleteTicket(id: number): Observable<Ticket> {
      return this.httpClient.delete<Ticket>("http://localhost:3000/tickets/" + id);
  }
}
