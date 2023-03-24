import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment as TicketComment } from 'src/app/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }

  postComment(comment: TicketComment): Observable<TicketComment> {
      return this.httpClient.post<TicketComment>("http://localhost:3000/comments", comment);
  }
}
