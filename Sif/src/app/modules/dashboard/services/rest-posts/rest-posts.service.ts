import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article,
  ArticleTag,
  Category,
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

  public getArticleByTitle(title: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.basePath}/${title}`).pipe(
      map(article => this.parseDate(article)),
      catchError(this.handleError<Article>('Failed to load blog', new Article()))
    );
  }

  public createBlog(article: Article): Observable<StatusResponse<Article>> {
    return this.httpClient.post<StatusResponse<Article>>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse<Article>>('Failed to load blog', this.errorResponse(StatusResponseType.Create, new Article())))
    );
  }

  public updateBlog(article: Article): Observable<StatusResponse<Article>> {
    return this.httpClient.put<StatusResponse<Article>>(`${this.basePath}`, article).pipe(
      catchError(this.handleError<StatusResponse<Article>>('Failed to load blog', this.errorResponse(StatusResponseType.Update, new Article)))
    );
  }

  public deleteArticles(): Observable<StatusResponse<Article[]>> {
    return this.httpClient.delete<StatusResponse<Article[]>>(`${this.basePath}`).pipe(
      catchError(this.handleError<StatusResponse<Article[]>>('Failed to load blog', this.errorResponse<Article[]>(StatusResponseType.Delete, [])))
    );
  }

  public addCategoryToArticle(artcileId: number, category: Category): Observable<StatusResponse<Article>> {
    return this.httpClient.post<StatusResponse<Article>>(`${this.basePath}/category/${artcileId}`, category).pipe(
      catchError(this.handleError<StatusResponse<Article>>('Failed to add category', this.errorResponse<Article>(StatusResponseType.Create, { })))
    );
  }

  public removeCategoryFromArticle(artcileId: number, category: Category): Observable<StatusResponse<Article[]>> {
    const options = this.createOptions(category);
    return this.httpClient.delete<StatusResponse<Article[]>>(`${this.basePath}/category/${artcileId}`, options).pipe(
      catchError(this.handleError<StatusResponse<Article[]>>('Failed to remove category', this.errorResponse<Article[]>(StatusResponseType.Delete, [])))
    );
  }

  public addTagToArticle(articleTag: ArticleTag): Observable<StatusResponse<ArticleTag>> {
    return this.httpClient.post<StatusResponse<ArticleTag>>(`${this.basePath}/tag`, articleTag).pipe(
      catchError(this.handleError<StatusResponse<ArticleTag>>('Failed to add tag', this.errorResponse<ArticleTag>(StatusResponseType.Create, {})))
    );
  }

  public removeTagFromArticle(articleTag: ArticleTag): Observable<StatusResponse<ArticleTag[]>> {
    const options = this.createOptions(articleTag);
    return this.httpClient.delete<StatusResponse<ArticleTag[]>>(`${this.basePath}/tag`, options).pipe(
      catchError(this.handleError<StatusResponse<ArticleTag[]>>('Failed to remove tag', this.errorResponse<ArticleTag[]>(StatusResponseType.Delete, [])))
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
