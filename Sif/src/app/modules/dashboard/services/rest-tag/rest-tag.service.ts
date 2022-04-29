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

  public createTag(tag: Tag): Observable<StatusResponse<Tag>> {
    return this.httpClient.post<StatusResponse<Tag>>(`${this.basePath}`, tag).pipe(
      catchError(this.handleError<StatusResponse<Tag>>('Unable to create new tag', this.errorResponse<Tag>(StatusResponseType.Create, new Tag())))
    );
  }
  public updateTag(tag: Tag): Observable<StatusResponse<Tag>>  {
    return this.httpClient.put<StatusResponse<Tag>>(`${this.basePath}`, tag).pipe(
      catchError(this.handleError<StatusResponse<Tag>>('Unable to update tag', this.errorResponse<Tag>(StatusResponseType.Update, new Tag())))
    );
  }
  public deleteTag(id: number): Observable<StatusResponse<Tag[]>>  {
    return this.httpClient.delete<StatusResponse<Tag[]>>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError<StatusResponse<Tag[]>>('Unable to delete tag', this.errorResponse<Tag[]>(StatusResponseType.Delete, [])))
    );
  }
}
