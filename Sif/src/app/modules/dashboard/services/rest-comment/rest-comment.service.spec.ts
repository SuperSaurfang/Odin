/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestCommentService } from './rest-comment.service';

describe('Service: RestComment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestCommentService]
    });
  });

  it('should ...', inject([RestCommentService], (service: RestCommentService) => {
    expect(service).toBeTruthy();
  }));
});
