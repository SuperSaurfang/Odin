/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RestPostsService } from './rest-posts.service';

describe('Service: RestPosts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestPostsService]
    });
  });

  it('should ...', inject([RestPostsService], (service: RestPostsService) => {
    expect(service).toBeTruthy();
  }));
});
