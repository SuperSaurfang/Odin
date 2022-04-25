import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Article, StatusResponse, StatusResponseType } from 'src/app/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RestPageService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('dashboard/page');
  }

  public getPageByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load page', new Article()))
    );
  }

  public getPages(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}`).pipe(
      map(articles => this.parseDates(articles)),
      catchError(this.handleError<Article[]>('Failed to load page list', []))
    );
  }

  public savePage(article: Article): Observable<StatusResponse<Article>> {
    return this.httpClient.post<StatusResponse<Article>>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse<Article>>('Unable to save page', this.errorResponse(StatusResponseType.Create, new Article())))
    );
  }

  public updatePage(article: Article): Observable<StatusResponse<Article>> {
    return this.httpClient.put<StatusResponse<Article>>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse<Article>>('Unable to update page', this.errorResponse(StatusResponseType.Update, new Article)))
    );
  }

  public deletePages(): Observable<StatusResponse<Article[]>> {
    return this.httpClient.delete<StatusResponse<Article[]>>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse<Article[]>>('Unable to delete pages', this.errorResponse(StatusResponseType.Delete, [])))
    );
  }

}
