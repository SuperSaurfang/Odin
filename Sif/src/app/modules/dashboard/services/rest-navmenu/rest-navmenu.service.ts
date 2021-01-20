import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, StatusResponse, NavMenu, StatusResponseType } from 'src/app/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestNavmenuService extends RestBase {

constructor(protected httpClient: HttpClient) {
  super('adminnavmenu');
 }

 public GetArticleList(): Observable<Article[]> {
   return this.httpClient.get<Article[]>(`${this.basePath}/article-list`).pipe(
     catchError(this.handleError<Article[]>('Unable to find article list', []))
   );
 }

 public GetFlatList(): Observable<NavMenu[]> {
   return this.httpClient.get<NavMenu[]>(`${this.basePath}`).pipe(
     catchError(this.handleError<NavMenu[]>('Unable to get flat navmenu list', []))
   );
 }

 public CreateNavMenu(navMenu: NavMenu): Observable<StatusResponse> {
   return this.httpClient.post<StatusResponse>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse>('Unable to create navmenu', this.errorResponse(StatusResponseType.Create)))
   );
 }

 public UpdateNavMenu(navMenu: NavMenu) {
   return this.httpClient.put<StatusResponse>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse>('Unable to update navmenu', this.errorResponse(StatusResponseType.Update)))
   );
 }

 public DeleteNavMenu(id: number): Observable<StatusResponse> {
   return this.httpClient.delete<StatusResponse>(`${this.basePath}/${id}`).pipe(
     catchError(this.handleError<StatusResponse>('Unable to delete navmenu', this.errorResponse(StatusResponseType.Delete)))
   );
 }

}
