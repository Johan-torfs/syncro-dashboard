import { NgModule } from '@angular/core';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketService } from './ticket.service';
import { UserModule } from '../user/user.module';
import { PriorityModule } from '../priority/priority.module';



@NgModule({
  declarations: [
    TicketListComponent,
    TicketFormComponent
  ],
  imports: [
    SharedModule,
    UserModule,
    PriorityModule
  ],
  exports: [
    TicketListComponent,
    TicketFormComponent
  ],
  providers: [
    TicketService
  ]
})
export class TicketModule { }
