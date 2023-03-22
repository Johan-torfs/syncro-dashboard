import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { comment } from 'postcss';
import { Subscription } from 'rxjs';
import { Priority } from '../../priority/priority';
import { PriorityService } from '../../priority/priority.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  isAdd: boolean = false;
  isEdit: boolean = false;
  ticketId: number = 0;

  customers: User[] = [];
  technicians: User[] = [];
  priorities: Priority[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  ticket$: Subscription = new Subscription();
  customers$: Subscription = new Subscription();
  technicians$: Subscription = new Subscription();
  priorities$: Subscription = new Subscription();
  postTicket$: Subscription = new Subscription();
  putTicket$: Subscription = new Subscription();

  ticketForm = new FormGroup({
    number: new FormControl(0),
    subject: new FormControl(''),
    status: new FormControl(''),
    priorityId: new FormControl(0),
    customerId: new FormControl(0),
    technicianId: new FormControl(0),
    comment: new FormControl('')
  });

  constructor(private router: Router, private ticketService: TicketService, private userService: UserService, private priorityService: PriorityService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.ticketId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    this.customers$ = this.userService.getCustomers().subscribe(result => {
      this.customers = result;
    });

    this.technicians$ = this.userService.getTechnicians().subscribe(result => {
      this.technicians = result;
    });

    this.priorities$ = this.priorityService.getPriorities().subscribe(result => {
      this.priorities = result;
    });

    if (this.ticketId != null && this.ticketId > 0) {
      this.ticket$ = this.ticketService.getTicketById(this.ticketId).subscribe(result => {
        this.ticketForm.setValue({
          number: result.number,
          subject: result.subject,
          status: result.status,
          priorityId: result.priority?.id || 0,
          customerId: result.customer.id,
          technicianId: result.technician?.id || 0,
          comment: ''
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ticket$.unsubscribe();
    this.customers$.unsubscribe();
    this.technicians$.unsubscribe();
    this.priorities$.unsubscribe();
    this.postTicket$.unsubscribe();
    this.putTicket$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postTicket$ = this.ticketService.postTicket(this.ticketForm.value as Ticket).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/tickets"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      delete this.ticketForm.value.comment;
      this.putTicket$ = this.ticketService.patchTicket(this.ticketId, this.ticketForm.value as Ticket).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/tickets"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
