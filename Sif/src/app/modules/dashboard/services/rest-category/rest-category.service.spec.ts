/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestCategoryService } from './rest-category.service';

describe('Service: RestCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestCategoryService]
    });
  });

  it('should ...', inject([RestCategoryService], (service: RestCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
