import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, StatusResponse, NavMenu, EChangeResponse } from 'src/app/core';
import { catchError } from 'rxjs/operators';

const StatusError: StatusResponse = {
  change: EChangeResponse.Error,
  message: 'Http error'
};

@Injectable()
export class RestNavmenuService extends RestBase {

constructor(protected httpClient: HttpClient) {
  super('navmenu/admin');
 }

 public GetArticleList(): Observable<Article[]> {
   return this.httpClient.get<Article[]>(`${this.basePath}/article-list`).pipe(
     catchError(this.handleError<Article[]>('Unable to find article list', []))
   );
 }

 public CreateNavMenu(navMenu: NavMenu): Observable<StatusResponse> {
   return this.httpClient.post<StatusResponse>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse>('Unable to create navmenu', StatusError))
   );
 }

 public UpdateNavMenu(navMenu: NavMenu) {
   return this.httpClient.put<StatusResponse>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse>('Unable to update navmenu', StatusError))
   );
 }

 public DeleteNavMenu(id: number): Observable<StatusResponse> {
   return this.httpClient.get<StatusResponse>(`${this.basePath}/${id}`);
 }

}
