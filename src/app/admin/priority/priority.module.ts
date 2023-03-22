import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriorityService } from './priority.service';
import { PriorityListComponent } from './priority-list/priority-list.component';
import { PriorityFormComponent } from './priority-form/priority-form.component';



@NgModule({
  declarations: [
    PriorityListComponent,
    PriorityFormComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    PriorityService
  ]
})
export class PriorityModule { }
