import { NgModule } from '@angular/core';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { SharedModule } from '../shared/shared.module';
import { TicketService } from './ticket.service';
import { CommentModule } from '../comment/comment.module';



@NgModule({
  declarations: [
    TicketListComponent,
    TicketFormComponent
  ],
  imports: [
    SharedModule,
    CommentModule
  ],
  exports: [
    TicketListComponent,
    TicketFormComponent
  ],
  providers: [
    TicketService,
  ],
})
export class TicketModule { }
