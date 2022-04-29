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

  public createCategory(category: Category): Observable<StatusResponse<Category>> {
    return this.httpClient.post<StatusResponse<Category>>(`${this.basePath}`, category).pipe(
      catchError(this.handleError<StatusResponse<Category>>('Unable to create new category', this.errorResponse(StatusResponseType.Create, new Category())))
    );
  }

  public updateCategory(category: Category): Observable<StatusResponse<Category>> {
    return this.httpClient.put<StatusResponse<Category>>(`${this.basePath}`, category).pipe(
      catchError(this.handleError<StatusResponse<Category>>('Unable to update category', this.errorResponse(StatusResponseType.Update, new Category())))
    );
  }

  public deleteCategory(id: number): Observable<StatusResponse<Category[]>> {
    return this.httpClient.delete<StatusResponse<Category[]>>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError<StatusResponse<Category[]>>('Failed to delete category', this.errorResponse(StatusResponseType.Delete, [])))
    );
  }

}
