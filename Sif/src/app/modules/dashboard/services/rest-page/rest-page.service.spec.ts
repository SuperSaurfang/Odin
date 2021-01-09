/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RestPageService } from './rest-page.service';

describe('Service: RestPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestPageService]
    });
  });

  it('should ...', inject([RestPageService], (service: RestPageService) => {
    expect(service).toBeTruthy();
  }));
});
