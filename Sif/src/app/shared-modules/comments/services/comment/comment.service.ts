import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Comment, StatusResponseType } from 'src/app/core/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class CommentService {

  private commentIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  private commentSubject: Subject<Comment> = new Subject<Comment>();

  private sourceComments: Comment[] = [];
  constructor(private restService: RestService) {}


  public loadComments(articleId: number): Observable<Comment[]> {
    this.restService.getComment(articleId).subscribe(comments => {
      this.sourceComments = comments;
      this.commentsSubject.next(comments);
    });
    return this.commentsSubject;
  }

  public saveComment(comment: Comment) {
    this.restService.postComment(comment).subscribe(response => {
        switch (response.responseType) {
          case StatusResponseType.Create:
            if (comment.userId !== 'guest') {
              this.addComment(comment);
              this.commentsSubject.next(this.sourceComments);
              this.commentSubject.next(comment);
              this.commentIdSubject.next(null);
            }
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

  private addComment(comment: Comment) {
    if (comment.answerOf === null) {
      this.sourceComments.push(comment);
    } else {
      const foundComment = this.findComment(this.sourceComments, comment.answerOf);
      if (!foundComment.answers) {
        foundComment.answers = [];
      }
      foundComment.answers.push(comment);
    }
  }

  private findComment(comments: Comment[], answerOf: number): Comment {
    let foundComment: Comment;
    for (const comment of comments) {
      if (comment.commentId !== answerOf && comment.answers !== undefined) {
        foundComment = this.findComment(comment.answers, answerOf);
      }

      if (comment.commentId === answerOf) {
        return comment;
      }
    }
    return foundComment;
  }

}
