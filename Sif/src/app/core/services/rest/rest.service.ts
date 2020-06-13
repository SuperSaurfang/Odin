import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, Comment, User } from '../../models';
import { environment } from '../../../../environments/environment';
import { ChangeResponse } from '../../models/changeResponse';

@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient, ) { }


  public getBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.restApi}/blog`).pipe(
      map(article => this.parseDate(article))
    );
  }

  public getBlogByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.restApi}/blog/${title}`).pipe(
      map(article => {
        article.creationDate = new Date(article.creationDate);
        article.modificationDate = new Date(article.modificationDate);
        return article
      })
    )
  }

  public getFullBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.restApi}/blog/admin`).pipe(
      map(article => this.parseDate(article))
    )
  }

  public updateBlog(article: Article): Observable<ChangeResponse> {
    return this.httpClient.put<ChangeResponse>(`${environment.restApi}/blog/admin`, article)
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
      })
      return articles
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpResponse<T>): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
