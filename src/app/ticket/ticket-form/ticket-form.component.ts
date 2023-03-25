import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Priority } from 'src/app/admin/priority/priority';
import { PriorityService } from 'src/app/admin/priority/priority.service';
import { Ticket } from 'src/app/ticket/ticket';
import { User } from 'src/app/admin/user/user';
import { UserService } from 'src/app/admin/user/user.service';
import { Comment as TicketComment } from 'src/app/comment/comment';
import { TicketService } from '../ticket.service';
import { CommentService } from 'src/app/comment/comment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  ticketId: number = 0;

  isCustomer: boolean = false;
  isTechnician: boolean = false;
  userId: number = 0;

  customers: User[] = [];
  priorities: Priority[] = [];
  comments: TicketComment[] = [];

  isSubmitted: boolean = false;
  isSubmittedComment: boolean = false;
  errorMessage: string = "";

  ticket$: Subscription = new Subscription();
  customers$: Subscription = new Subscription();
  priorities$: Subscription = new Subscription();
  postTicket$: Subscription = new Subscription();
  putTicket$: Subscription = new Subscription();
  postComment$: Subscription = new Subscription();

  ticketForm = new FormGroup({
    number: new FormControl(0),
    subject: new FormControl(''),
    status: new FormControl(''),
    priorityId: new FormControl(0),
    customerId: new FormControl(0),
    comment: new FormControl(''),
    resolved_date: new FormControl('')
  });

  commentForm = new FormGroup({
    body: new FormControl('')
  });

  constructor(
    private router: Router, 
    private ticketService: TicketService, 
    private userService: UserService, 
    private priorityService: PriorityService, 
    private commentService: CommentService
  ) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.ticketId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    this.isCustomer = localStorage.getItem('role') == 'customer' || localStorage.getItem('role') == '';
    this.isTechnician = localStorage.getItem('role') == 'technician';

    this.userId = +(localStorage.getItem('id') || 0);

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (!this.isCustomer && this.isAdd) {
      this.customers$ = this.userService.getCustomers().subscribe(result => {
        this.customers = result;
      });
    }

    this.priorities$ = this.priorityService.getPriorities().subscribe(result => {
      this.priorities = result;
    });

    this.getTicket();
  }

  getTicket() {
    if (this.ticketId != null && this.ticketId > 0) {
      this.ticket$ = this.ticketService.getTicketById(this.ticketId).subscribe(result => {
        this.ticketForm.setValue({
          number: result.number,
          subject: result.subject,
          status: result.status,
          priorityId: result.priority?.id || 0,
          customerId: result.customer.id,
          comment: '',
          resolved_date: result.resolved_date?.toString() || ''
        });

        this.comments = result.comments;
        this.commentForm.setValue({
          body: ''
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ticket$.unsubscribe();
    this.customers$.unsubscribe();
    this.priorities$.unsubscribe();
    this.postTicket$.unsubscribe();
    this.putTicket$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postTicket$ = this.ticketService.postTicket(this.ticketForm.value as Ticket).subscribe({
        next: (v) => this.router.navigateByUrl("/tickets"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      delete this.ticketForm.value.comment;
      this.putTicket$ = this.ticketService.patchTicket(this.ticketId, this.ticketForm.value as Ticket).subscribe({
        next: (v) => this.router.navigateByUrl("/tickets"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  onResolve() {
    this.putTicket$ = this.ticketService.patchTicketStatus(this.ticketId, "Resolved").subscribe({
      next: (v) => this.router.navigateByUrl("/tickets"),
      error: (e) => this.errorMessage = e.message
    });
  }

  onSubmitComment() {
    this.isSubmittedComment = true;
    this.postComment$ = this.commentService.postComment({...this.commentForm.value as TicketComment, ticketId: this.ticketId}).subscribe({
      next: (v) => this.router.navigateByUrl("/tickets"),
      error: (e) => this.errorMessage = e.message
    });
  }

  formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd HH:mm', 'en-US');
  }

  back() {
    this.router.navigateByUrl("/tickets");
  }

}
