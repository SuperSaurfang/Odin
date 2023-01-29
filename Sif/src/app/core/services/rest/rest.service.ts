import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article,
  Comment,
  User,
  NavMenu,
  StatusResponseType,
  SearchRequest,
  SearchResult,
  StatusResponse,
  Paging,
  ArticleResponse,
  ArticleRequest} from '../../models';
import { RestBase } from '../../baseClass';


@Injectable()
export class RestService extends RestBase {

  constructor(protected httpClient: HttpClient) {
    super('public');
  }

  public getBlog(paging: Paging): Observable<ArticleResponse> {
    return this.httpClient.post<ArticleResponse>(`${this.basePath}/blog`, paging).pipe(
      map(response => {
        response.articles = this.parseDates(response.articles)
        return response;
      }),
      catchError(this.handleError<ArticleResponse>('Failed to load blog', new ArticleResponse()))
    );
  }

  public getBlogByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/blog/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public getCategoryByName(request: ArticleRequest): Observable<ArticleResponse> {
    return this.httpClient.post<ArticleResponse>(`${this.basePath}/blog/category/`, request).pipe(
      map(response => {
        response.articles = this.parseDates(response.articles)
        return response;
      }),
      catchError(this.handleError<ArticleResponse>('Failed to blog by category', new ArticleResponse))
    );
  }

  public getBlogByTagName(request: ArticleRequest): Observable<ArticleResponse> {
    return this.httpClient.post<ArticleResponse>(`${this.basePath}/blog/tag/`, request).pipe(
      map(response => {
        response.articles =this.parseDates(response.articles);
        return response;
      }),
      catchError(this.handleError<ArticleResponse>('Failed to load blog by tag', new ArticleResponse))
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

  public postComment(comment: Comment): Observable<StatusResponse<Comment>> {
    return this.httpClient.post<StatusResponse<Comment>>(`${this.basePath}/comment`, comment).pipe(
      catchError(this.handleError<StatusResponse<Comment>>('Failed to save comment', this.errorResponse<Comment>(StatusResponseType.Create, new Comment())))
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
    if (comment.replies) {
      comment.replies.forEach(reply => {
        this.parseCommentDate(reply)
      });
    }
  }
}
