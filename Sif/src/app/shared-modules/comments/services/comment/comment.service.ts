import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Comment, StatusResponseType } from 'src/app/core/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class CommentService {

  private commentIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

  constructor(private restService: RestService) {}


  public loadComments(articleId: number): Observable<Comment[]> {
    this.restService.getComment(articleId).subscribe(comments => {
      this.commentsSubject.next(comments);
    });
    return this.commentsSubject;
  }

  public saveComment(comment: Comment) {
    this.restService.postComment(comment).subscribe(response => {
        switch (response.responseType) {
          case StatusResponseType.Create:
            this.restService.getComment(comment.articleId).subscribe(response => {
              this.commentsSubject.next(response);
              this.commentIdSubject.next(null);
            });
            break;
          default:
            break;
      }
    });
  }

  public setAnswer(commentId: number) {
    this.commentIdSubject.next(commentId);
  }

  public isAnswerTo() {
    return this.commentIdSubject;
  }

}
