import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommentService } from './comment.service';



@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
