import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, StatusResponse, StatusResponseType } from 'src/app/core';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class RestPostsService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super('adminblog');
  }

  public getFullBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}`).pipe(
      map(article => this.parseDates(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getBlogId(title: string): Observable<number> {
    return this.httpClient.get<number>(`${this.basePath}/id/${title}`).pipe(
      catchError(this.handleError<number>('Failed to load blog', -1))
    );
  }

  public getArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public createBlog(article: Article): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public updateBlog(article: Article): Observable<StatusResponse> {
    return this.httpClient.put<StatusResponse>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', this.errorResponse(StatusResponseType.Update)))
    );
  }

  public deleteArticles(): Observable<StatusResponse> {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', this.errorResponse(StatusResponseType.Delete)))
    );
  }

}
