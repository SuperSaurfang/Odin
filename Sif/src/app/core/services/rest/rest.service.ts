import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, Comment, User, ChangeResponse, EChangeResponse } from '../../models';
import { environment } from '../../../../environments/environment';

const ErrorResponse: ChangeResponse = {
  ChangeResponse: EChangeResponse.Error
};
@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) { }


  public getBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.restApi}/blog`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getBlogByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.restApi}/blog/${title}`).pipe(
      map(article => {
        article.creationDate = new Date(article.creationDate);
        article.modificationDate = new Date(article.modificationDate);
        return article;
      }),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public getFullBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.restApi}/blog/admin`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.restApi}/blog/admin/${title}`).pipe(
      map(article => {
        article.creationDate = new Date(article.creationDate);
        article.modificationDate = new Date(article.modificationDate);
        return article;
      }),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public deleteArticles(): Observable<ChangeResponse> {
    return this.httpClient.delete<ChangeResponse>(`${environment.restApi}/blog/admin`).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', ErrorResponse))
    );
  }

  public updateBlog(article: Article): Observable<ChangeResponse> {
    return this.httpClient.put<ChangeResponse>(`${environment.restApi}/blog/admin`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', ErrorResponse))
    );
  }

  public getBlogId(title: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.restApi}/blog/admin/id/${title}`).pipe(
      catchError(this.handleError<number>('Failed to load blog', -1))
    );
  }

  public createBlog(article: Article): Observable<ChangeResponse> {
    return this.httpClient.post<ChangeResponse>(`${environment.restApi}/blog/admin`, article).pipe(
      catchError(this.handleError<ChangeResponse>('Failed to load blog', ErrorResponse))
    );
  }

  public getSite(title: string): Observable<Article[]> {
    const params = new HttpParams().set('title', title);
    return this.httpClient.get<Article[]>(environment.restApi + '/site', {params: params});
  }

  public getComment(articleId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(environment.restApi + `/comment/${articleId}`);
  }

  public postComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(environment.restApi + '/comment', comment);
  }

  public postLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.restApi}/auth`, user).pipe
    (
      catchError(this.handleError<User>('Login failed', new User()))
    );
  }

  private parseDate(articles: Article[]): Article[] {
      articles.forEach(article => {
        article.creationDate = new Date(article.creationDate);
        article.modificationDate = new Date(article.modificationDate);
      });
      return articles;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpResponse<T>): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
