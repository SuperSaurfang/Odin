import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, Comment, User, ChangeResponse, NavMenu, StatusResponse, StatusResponseType } from '../../models';
import { RestBase } from '../../baseClass';


@Injectable()
export class RestService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super();
  }

  public getBlog(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}/blog`).pipe(
      map(article => this.parseDates(article)),
      catchError(this.handleError<Article[]>('Failed to load blog', []))
    );
  }

  public getBlogByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/blog/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public getPage(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/page/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load page', new Article()))
    );
  }

  public getNavMenu(): Observable<NavMenu[]> {
    return this.httpClient.get<NavMenu[]>(`${this.basePath}/navmenu`).pipe(
      catchError(this.handleError<NavMenu[]>('Failed to load navmenu', []))
    );
  }

  public getComment(articleId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.basePath + `/comment/${articleId}`);
  }

  public postComment(comment: Comment): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(this.basePath + '/comment', comment).pipe(
      catchError(this.handleError<StatusResponse>('Failed to save comment', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public postLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.basePath}/auth`, user).pipe
    (
      catchError(this.handleError<User>('Login failed', new User()))
    );
  }

}
