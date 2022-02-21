import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatusResponse, StatusResponseType, Tag } from 'src/app/core';
import { RestBase } from 'src/app/core/baseClass';

@Injectable()
export class RestTagService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super('dashboard/tag');
  }

  public getTagList(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`${this.basePath}`).pipe(
      catchError(this.handleError<Tag[]>('Unable to get category list', []))
    );
  }

  public createTag(tag: Tag): Observable<StatusResponse> {
    return this.httpClient.post<StatusResponse>(`${this.basePath}`, tag).pipe(
      catchError(this.handleError<StatusResponse>('Unable to create new tag', this.errorResponse(StatusResponseType.Create)))
    );
  }
  public updateTag(tag: Tag): Observable<StatusResponse>  {
    return this.httpClient.put<StatusResponse>(`${this.basePath}`, tag).pipe(
      catchError(this.handleError<StatusResponse>('Unable to update tag', this.errorResponse(StatusResponseType.Update)))
    );
  }
  public deleteTag(id: number): Observable<StatusResponse>  {
    return this.httpClient.delete<StatusResponse>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError<StatusResponse>('Unable to delete tag', this.errorResponse(StatusResponseType.Delete)))
    );
  }
}
