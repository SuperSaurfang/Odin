import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatusResponse, Comment, StatusResponseType } from 'src/app/core';
import { RestBase } from 'src/app/core/baseClass';

@Injectable()
export class RestCommentService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('admincomment');
  }

  public getCommentList(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.basePath}`).pipe(
      catchError(this.handleError<Comment[]>('Unable load Comments', []))
    );
  }

  public putComment(comment: Comment): Observable<StatusResponse> {
    return this.httpClient.put<StatusResponse>(`${this.basePath}`, comment).pipe(
      catchError(this.handleError<StatusResponse>('Unable to update comment', this.errorResponse(StatusResponseType.Update)))
    );
  }

  public postComment(comment: Comment): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}`, comment).pipe(
      catchError(this.handleError<StatusResponse>('Unable to create comment', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public deleteComments(): Observable<StatusResponse> {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse>('Unable to delete comment', this.errorResponse(StatusResponseType.Delete)))
    );
  }

  public getArticleList() {

  }
}
