import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestBase } from '../../baseClass';
import { FileUploadResponse } from '../../models';

@Injectable()
export class ImageUploadService extends RestBase {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public imageUpload(formData: FormData): Observable<HttpEvent<FileUploadResponse>> {
    return this.httpClient.post<FileUploadResponse>(`${this.basePath}/dashboard/FileUpload`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

}
