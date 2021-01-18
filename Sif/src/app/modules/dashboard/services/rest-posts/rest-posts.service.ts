import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ChangeResponse, ChangeResponseOld, StatusResponse } from 'src/app/core';
import { map, catchError } from 'rxjs/operators';

const StatusError: StatusResponse = {
  change: ChangeResponse.Error,
  message: 'Http error'
};

@Injectable()
export class RestPostsService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getFullBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}/adminblog`).pipe(
      map(article => this.parseDates(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getBlogId(title: string): Observable<number> {
    return this.httpClient.get<number>(`${this.basePath}/adminblog/id/${title}`).pipe(
      catchError(this.handleError<number>('Failed to load blog', -1))
    );
  }

  public getArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/adminblog/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public createBlog(article: Article): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}/adminblog`, article).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', StatusError))
    );
  }

  public updateBlog(article: Article): Observable<StatusResponse> {
    return this.httpClient.put<StatusResponse>(`${this.basePath}/adminblog`, article).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', StatusError))
    );
  }

  public deleteArticles(): Observable<StatusResponse> {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}/adminblog`).pipe(
      catchError(this.handleError<StatusResponse>('Failed to load blog', StatusError))
    );
  }

}
