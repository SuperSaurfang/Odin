import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article,
  Comment,
  User,
  NavMenu,
  StatusResponse,
  StatusResponseType,
  SearchRequest,
  SearchResult } from '../../models';
import { RestBase } from '../../baseClass';


@Injectable()
export class RestService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('public');
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

  public getCategoryByName(name: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}/blog/category/${name}`).pipe(
      map(article => this.parseDates(article)),
      catchError(this.handleError<Article[]>('Failed to blog by category', []))
    );
  }

  public getBlogByTagName(name: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.basePath}/blog/tag/${name}`).pipe(
      map(articles => this.parseDates(articles)),
      catchError(this.handleError<Article[]>('Failed to load blog by tag', []))
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
    return this.httpClient.get<Comment[]>(this.basePath + `/comment/${articleId}`).pipe(
      map(comments => {
        comments.forEach(item => this.parseCommentDate(item));
        return comments;
      }),
      catchError(this.handleError<Comment[]>('Failed to load comments for artcile', []))
    );
  }

  public postComment(comment: Comment): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}/comment`, comment).pipe(
      catchError(this.handleError<StatusResponse>('Failed to save comment', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public postSearch(searchRequest: SearchRequest): Observable<SearchResult> {
    return this.httpClient.post<SearchResult>(`${this.basePath}/search`, searchRequest).pipe(
      map(result => {
        if (result.articles && result.articles.length > 0) {
          result.articles = this.parseDates(result.articles);
        }
        return result;
      }),
      catchError(this.handleError<SearchResult>('Search failed', new SearchResult()))
    );
  }

  public postLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.basePath}/auth`, user).pipe
    (
      catchError(this.handleError<User>('Login failed', new User()))
    );
  }

  private parseCommentDate(comment: Comment) {
    comment.creationDate = new Date(comment.creationDate);
    if (comment.answers) {
      comment.answers.forEach(item => this.parseCommentDate(item));
    }
  }
}
