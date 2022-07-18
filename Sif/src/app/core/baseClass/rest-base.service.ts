import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Article, ChangeResponse, StatusResponse, StatusResponseType } from '../models';

export abstract class RestBase {
  protected basePath: string;

  protected errorResponse<TModel>(type: StatusResponseType, model: TModel): StatusResponse<TModel> {
    return {
      change: ChangeResponse.Error,
      model: model,
      responseType: type
    };
  }

  /**
   * the base constructor for the htpp interface
   * @param baseModify modify the base http endpoint from the enviroment restapi
   */
  constructor(baseModify: string = '') {
    this.basePath = environment.restApi;
    if (baseModify.length > 0) {
      this.basePath += `/${baseModify}`;
    }
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpResponse<T>): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected parseDates(articles: Article[]): Article[] {
    articles.forEach(article => {
      article.creationDate = new Date(article.creationDate);
      article.modificationDate = new Date(article.modificationDate);
    });
    return articles;
  }

  protected parseDate(article: Article): Article {
    article.creationDate = new Date(article.creationDate);
    article.modificationDate = new Date(article.modificationDate);
    return article;
  }
}
