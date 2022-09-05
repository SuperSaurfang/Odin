/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowsScrollService } from './windows-scroll.service';

describe('Service: WindowsScroll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowsScrollService]
    });
  });

  it('should ...', inject([WindowsScrollService], (service: WindowsScrollService) => {
    expect(service).toBeTruthy();
  }));
});
