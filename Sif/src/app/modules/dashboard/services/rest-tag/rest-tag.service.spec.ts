/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestTagService } from './rest-tag.service';

describe('Service: RestTag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestTagService]
    });
  });

  it('should ...', inject([RestTagService], (service: RestTagService) => {
    expect(service).toBeTruthy();
  }));
});
