import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StatusResponse, Comment, StatusResponseType } from 'src/app/core';
import { RestBase } from 'src/app/core/baseClass';

@Injectable()
export class RestCommentService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('dashboard/comment');
  }

  public getCommentList(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.basePath}`).pipe(
      map(comments => this.restoreDate(comments)),
      catchError(this.handleError<Comment[]>('Unable load Comments', []))
    );
  }

  public putComment(comment: Comment): Observable<StatusResponse<Comment>> {
    return this.httpClient.put<StatusResponse<Comment>>(`${this.basePath}`, comment).pipe(
      catchError(this.handleError<StatusResponse<Comment>>('Unable to update comment', this.errorResponse(StatusResponseType.Update, new Comment())))
    );
  }

  public postComment(comment: Comment): Observable<StatusResponse<Comment>> {
    return this.httpClient.post<StatusResponse<Comment>>(`${this.basePath}`, comment).pipe(
      catchError(this.handleError<StatusResponse<Comment>>('Unable to create comment', this.errorResponse(StatusResponseType.Create, new Comment())))
    );
  }

  public deleteComments(): Observable<StatusResponse<Comment[]>> {
    return this.httpClient.delete<StatusResponse<Comment[]>>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse<Comment[]>>('Unable to delete comment', this.errorResponse(StatusResponseType.Delete, [])))
    );
  }

  private restoreDate(comments: Comment[]): Comment[] {
    comments.forEach(comment => {
      comment.creationDate = new Date(comment.creationDate);
    });
    return comments;
  }

  public getArticleList() {

  }
}
