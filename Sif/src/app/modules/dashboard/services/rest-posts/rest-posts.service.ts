import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ChangeResponse } from 'src/app/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestPostsService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getFullBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}/blog/admin`).pipe(
      map(article => this.parseDates(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getBlogId(title: string): Observable<number> {
    return this.httpClient.get<number>(`${this.basePath}/blog/admin/id/${title}`).pipe(
      catchError(this.handleError<number>('Failed to load blog', -1))
    );
  }

  public getArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/blog/admin/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public createBlog(article: Article): Observable<ChangeResponse> {
    return this.httpClient.post<ChangeResponse>(`${this.basePath}/blog/admin`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', this.errorResponse))
    );
  }

  public updateBlog(article: Article): Observable<ChangeResponse> {
    return this.httpClient.put<ChangeResponse>(`${this.basePath}/blog/admin`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', this.errorResponse))
    );
  }

  public deleteArticles(): Observable<ChangeResponse> {
    return this.httpClient.delete<ChangeResponse>(`${this.basePath}/blog/admin`).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', this.errorResponse))
    );
  }

}
