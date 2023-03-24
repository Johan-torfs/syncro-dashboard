import { NgModule } from '@angular/core';
import { AdminTicketListComponent } from './admin-ticket-list/admin-ticket-list.component';
import { AdminTicketFormComponent } from './admin-ticket-form/admin-ticket-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketModule } from 'src/app/ticket/ticket.module';
import { UserModule } from '../user/user.module';
import { PriorityModule } from '../priority/priority.module';



@NgModule({
  declarations: [
    AdminTicketListComponent,
    AdminTicketFormComponent
  ],
  imports: [
    SharedModule,
    TicketModule,
    UserModule,
    PriorityModule
  ],
  exports: [
    AdminTicketListComponent,
    AdminTicketFormComponent
  ]
})
export class AdminTicketModule { }
