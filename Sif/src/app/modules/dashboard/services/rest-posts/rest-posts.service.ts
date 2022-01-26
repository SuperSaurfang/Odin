import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article,
  ArticleCategory,
  ArticleTag,
  StatusResponse,
  StatusResponseType } from 'src/app/core';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class RestPostsService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super('dashboard/blog');
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

  public addCategoryToArticle(articleCategory: ArticleCategory): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}/category`, articleCategory).pipe(
      catchError(this.handleError<StatusResponse>('Failed to add category', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public removeCategoryFromArticle(articleCategory: ArticleCategory): Observable<StatusResponse> {
    const options = this.createOptions(articleCategory);
    return this.httpClient.delete<StatusResponse>(`${this.basePath}/category`, options).pipe(
      catchError(this.handleError<StatusResponse>('Failed to remove category', this.errorResponse(StatusResponseType.Delete)))
    );
  }

  public addTagToArticle(articleTag: ArticleTag): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}/tag`, articleTag).pipe(
      catchError(this.handleError<StatusResponse>('Failed to add tag', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public removeTagFromArticle(articleTag: ArticleTag): Observable<StatusResponse> {
    const options = this.createOptions(articleTag);
    return this.httpClient.delete<StatusResponse>(`${this.basePath}/tag`, options).pipe(
      catchError(this.handleError<StatusResponse>('Failed to remove tag', this.errorResponse(StatusResponseType.Delete)))
    );
  }

  private createOptions<TBody>(body: TBody) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };
  }
}
