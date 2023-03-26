import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
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
  private ticketsByMonthSubject$ = new Subject<{key: string, open: number, resolved: number}[]>();
  public ticketsByMonthObservable$: Observable<{key: string, open: number, resolved: number}[]> = this.ticketsByMonthSubject$.asObservable();

  private employeeValuesSubject$ = new Subject<{key: string, value: number}[]>();
  public employeeValuesObservable$: Observable<{key: string, value: number}[]> = this.employeeValuesSubject$.asObservable();

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
      this.groupByMonth(result);
      this.count(result);
    });
  }

  groupByMonth(tickets: Ticket[]) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let ticketsByMonth: Ticket[][] = [];
    let ticketsForAreaChart: {key: string, open: number, resolved: number}[] = [];

    let month: number = 0;
    let year: number = 0;

    for (let i = tickets.length - 1; i >= 0; i--) {
      let ticket = tickets[i];
      let ticketDate = new Date(ticket.created_at);

      if (ticketDate.getMonth() != month || ticketDate.getFullYear() != year) {
        month = ticketDate.getMonth();
        year = ticketDate.getFullYear();
        ticketsByMonth.push([]);
        ticketsForAreaChart.push({key: monthNames[month], open: 0, resolved: 0});
      }

      ticketsByMonth[ticketsByMonth.length - 1].push(ticket);

      if (ticket.status.toLowerCase() == 'resolved')
        ticketsForAreaChart[ticketsForAreaChart.length - 1].resolved++;
      else 
        ticketsForAreaChart[ticketsForAreaChart.length - 1].open++;
    }

    let employeeValues = this.getEmployeeValues(ticketsByMonth[ticketsByMonth.length - 1]);
    this.employeeValuesSubject$.next(employeeValues);

    this.ticketsByMonthSubject$.next(ticketsForAreaChart);    
  }

  getEmployeeValues(tickets: Ticket[]) {
    let employeeValues: {key: string, value: number}[] = [{key: "Unassigned", value: 0}];

    for (let index = 0; index < tickets.length; index++) {
      let ticket = tickets[index];
      let technician = ticket.technician;
      
      if (technician) {
        let obj = employeeValues.find(obj => obj.key == technician?.firstname + ' ' + technician?.lastname);
        if (!!obj) {
          obj.value++;
        } else {
          employeeValues.push({key: technician?.firstname + ' ' + technician?.lastname, value: 1});
        }
      } else {
        employeeValues[0].value++;
      }
    }
    
    return employeeValues;
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
