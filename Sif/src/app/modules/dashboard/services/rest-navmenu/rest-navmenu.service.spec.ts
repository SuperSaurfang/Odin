/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestNavmenuService } from './rest-navmenu.service';

describe('Service: RestNavmenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestNavmenuService]
    });
  });

  it('should ...', inject([RestNavmenuService], (service: RestNavmenuService) => {
    expect(service).toBeTruthy();
  }));
});
