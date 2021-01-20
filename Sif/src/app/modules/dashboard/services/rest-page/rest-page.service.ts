import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Article, StatusResponse, StatusResponseType } from 'src/app/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RestPageService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('adminpage');
  }

  public getPageByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load page', new Article()))
    );
  }

  public getPageId(title: string): Observable<number> {
    return this.httpClient.get<number>(`${this.basePath}/id/${title}`).pipe(
      catchError(this.handleError<number>('Failed to get page id', -1))
    );
  }

  public getPages(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}`).pipe(
      map(articles => this.parseDates(articles)),
      catchError(this.handleError<Article[]>('Failed to load page list', []))
    );
  }

  public savePage(article: Article): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse>('Unable to save page', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public updatePage(article: Article): Observable<StatusResponse> {
    return this.httpClient.put<StatusResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse>('Unable to update page', this.errorResponse(StatusResponseType.Update)))
    );
  }

  public deletePages(): Observable<StatusResponse> {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse>('Unable to delete pages', this.errorResponse(StatusResponseType.Delete)))
    );
  }

}
