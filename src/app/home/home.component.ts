import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from '../ticket/ticket';
import { TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  coffee: number = 0;
  ticketsOpen: number = 0;
  ticketsClosed: number = 0;
  ticketsUpdated: number = 0;

  fromDate: Date = new Date();
  ticketsByMonth: Ticket[][] = [];

  employeeValues: {key: string, value: number}[] =  [{key: 'Johan', value: 44}, {key: 'Vlad', value: 55}, {key: 'Loïc', value: 41}, {key: 'Jordy', value: 17}];

  tickets$: Subscription = new Subscription();

  constructor(private ticketService: TicketService) { 
    this.fromDate.setMonth(this.fromDate.getMonth() - 12);
    this.fromDate.setDate(1);
  }

  ngOnInit(): void {
    this.getTickets();
  }

  ngOnDestroy(): void {
    this.tickets$.unsubscribe();
  }

  getTickets() {
    this.tickets$ = this.ticketService.getTicketsFromDate(this.fromDate).subscribe(result => {
      this.ticketsByMonth = this.groupByMonth(result);
      this.count(result);
    });
  }

  groupByMonth(tickets: Ticket[]) {
    let ticketsByMonth: Ticket[][] = [];
    let month: number = 0;
    let year: number = 0;

    for (let i = tickets.length - 1; i >= 0; i--) {
      let ticket = tickets[i];
      let ticketDate = new Date(ticket.created_at);

      if (ticketDate.getMonth() != month || ticketDate.getFullYear() != year) {
        month = ticketDate.getMonth();
        year = ticketDate.getFullYear();
        ticketsByMonth.push([]);
      }

      ticketsByMonth[ticketsByMonth.length - 1].push(ticket);
    }

    return ticketsByMonth;
  }

  count(tickets: Ticket[]) {
    let countOpen = 0;
    let countClosed = 0;
    let countUpdated = 0;

    for (let i = 0; i < tickets.length; i++) {
      let ticket = tickets[i];   

      if (this.isToday(ticket.created_at)) 
        countOpen++;

      if (this.isToday(ticket.updated_at)) 
        countUpdated++;

      if (this.isToday(ticket.resolved_date)) 
        countClosed++;
    }

    this.ticketsOpen = countOpen;
    this.ticketsClosed = countClosed;
    this.ticketsUpdated = countUpdated;
  }

  isToday(date: Date | undefined) {
    if (!date) return false;

    let dateObj = new Date(date);
    let today = new Date();

    return dateObj.getDate() == today.getDate() && dateObj.getMonth() == today.getMonth() && dateObj.getFullYear() == today.getFullYear();
  }
}
