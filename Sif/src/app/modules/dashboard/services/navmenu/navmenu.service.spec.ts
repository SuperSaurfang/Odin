/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavmenuService } from './navmenu.service';

describe('Service: Navmenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavmenuService]
    });
  });

  it('should ...', inject([NavmenuService], (service: NavmenuService) => {
    expect(service).toBeTruthy();
  }));
});
