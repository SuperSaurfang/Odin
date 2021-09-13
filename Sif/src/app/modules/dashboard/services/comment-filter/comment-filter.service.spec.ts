/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentFilterService } from './comment-filter.service';

describe('Service: CommentFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentFilterService]
    });
  });

  it('should ...', inject([CommentFilterService], (service: CommentFilterService) => {
    expect(service).toBeTruthy();
  }));
});
