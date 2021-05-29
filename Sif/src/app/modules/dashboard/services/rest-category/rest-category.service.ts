import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, StatusResponse, StatusResponseType } from 'src/app/core';
import { RestBase } from 'src/app/core/baseClass';

@Injectable()
export class RestCategoryService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super('dashboard/category');
  }

  public getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.basePath}`).pipe(
      catchError(this.handleError<Category[]>('Unable to get category list', []))
    );
  }

  public createCategory(category: Category): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}`, category).pipe(
      catchError(this.handleError<StatusResponse>('Unable to create new category', this.errorResponse(StatusResponseType.Create)))
    );
  }

  public updateCategory(category: Category): Observable<StatusResponse> {
    return this.httpClient.put<StatusResponse>(`${this.basePath}`, category).pipe(
      catchError(this.handleError<StatusResponse>('Unable to update category', this.errorResponse(StatusResponseType.Update)))
    );
  }

  public deleteCategory(id: number): Observable<StatusResponse> {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError<StatusResponse>('Failed to delete category', this.errorResponse(StatusResponseType.Delete)))
    );
  }

}
