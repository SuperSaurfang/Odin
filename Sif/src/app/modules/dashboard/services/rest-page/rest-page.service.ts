import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Article, ChangeResponse } from 'src/app/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RestPageService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('page/admin');
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

  public savePage(article: Article): Observable<ChangeResponse> {
    return this.httpClient.post<ChangeResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Unable to save page', this.errorResponse))
    );
  }

  public updatePage(article: Article): Observable<ChangeResponse> {
    return this.httpClient.put<ChangeResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Unable to update page', this.errorResponse))
    );
  }

  public deletePages(): Observable<ChangeResponse> {
    return this.httpClient.delete<ChangeResponse>(`${this.basePath}`).pipe(
      catchError(this.handleError<ChangeResponse>('Unable to delete pages', this.errorResponse))
    );
  }

}
