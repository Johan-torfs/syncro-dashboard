import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/ticket/ticket';
import { TicketService } from 'src/app/ticket/ticket.service';

@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.css']
})
export class AdminTicketListComponent {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  tickets$: Subscription = new Subscription();
  deleteTickets$: Subscription = new Subscription();

  errorMessage: string = '';
  search: string = '';

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.getTickets();
  }

  ngOnDestroy(): void {
    this.tickets$.unsubscribe();
    this.deleteTickets$.unsubscribe();
  }

  add() {
    this.router.navigate(['admin/tickets/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/tickets/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteTickets$ = this.ticketService.deleteTicket(id).subscribe({
      next: (v) => this.getTickets(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getTickets() {
    this.tickets$ = this.ticketService.getTickets().subscribe(result => {
      this.tickets = result;
      this.filterTickets();
    });
  }

  filterTickets() {
    if (this.search == '') {
      this.filteredTickets = this.tickets;
      return;
    }

    this.filteredTickets = this.tickets.filter(ticket => {
      var search = this.search.toLowerCase();
      return (
        ticket.subject.toLowerCase().includes(search) || 
        ticket.status.toLowerCase().includes(search) || 
        ticket.customer.firstname?.toLowerCase().includes(search) ||
        ticket.customer.lastname?.toLowerCase().includes(search) ||
        ticket.technician?.firstname?.toLowerCase().includes(search) ||
        ticket.technician?.lastname?.toLowerCase().includes(search) ||
        ticket.priority?.name.toLowerCase().includes(search)
      );
    });
  }
}
