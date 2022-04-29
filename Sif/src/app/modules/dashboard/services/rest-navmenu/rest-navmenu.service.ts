import { Injectable } from '@angular/core';
import { RestBase } from 'src/app/core/baseClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, StatusResponse, NavMenu, StatusResponseType, Category } from 'src/app/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestNavmenuService extends RestBase {

constructor(protected httpClient: HttpClient) {
  super('dashboard/navmenu');
 }

 public getArticleList(): Observable<Article[]> {
   return this.httpClient.get<Article[]>(`${this.basePath}/articles`).pipe(
     catchError(this.handleError<Article[]>('Unable to find article list', []))
   );
 }

 public getCategoryList(): Observable<Category[]> {
  return this.httpClient.get<Category[]>(`${this.basePath}/categories`).pipe(
    catchError(this.handleError<Category[]>('Unable to find category list', []))
  );
}

 public getFlatList(): Observable<NavMenu[]> {
   return this.httpClient.get<NavMenu[]>(`${this.basePath}`).pipe(
     catchError(this.handleError<NavMenu[]>('Unable to get flat navmenu list', []))
   );
 }

 public createNavMenu(navMenu: NavMenu): Observable<StatusResponse<NavMenu>> {
   return this.httpClient.post<StatusResponse<NavMenu>>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse<NavMenu>>('Unable to create navmenu', this.errorResponse(StatusResponseType.Create, new NavMenu())))
   );
 }

 public updateNavMenu(navMenu: NavMenu) {
   return this.httpClient.put<StatusResponse<NavMenu>>(`${this.basePath}`, navMenu).pipe(
     catchError(this.handleError<StatusResponse<NavMenu>>('Unable to update navmenu', this.errorResponse(StatusResponseType.Update, new NavMenu())))
   );
 }

 public deleteNavMenu(id: number): Observable<StatusResponse<NavMenu[]>> {
   return this.httpClient.delete<StatusResponse<NavMenu[]>>(`${this.basePath}/${id}`).pipe(
     catchError(this.handleError<StatusResponse<NavMenu[]>>('Unable to delete navmenu', this.errorResponse(StatusResponseType.Delete, [])))
   );
 }

}
