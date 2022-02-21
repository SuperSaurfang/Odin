/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageUploadService } from './image-upload.service';

describe('Service: ImageUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageUploadService]
    });
  });

  it('should ...', inject([ImageUploadService], (service: ImageUploadService) => {
    expect(service).toBeTruthy();
  }));
});
