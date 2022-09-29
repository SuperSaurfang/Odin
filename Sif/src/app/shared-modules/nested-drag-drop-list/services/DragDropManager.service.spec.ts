/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DragDropManagerService } from './DragDropManager.service';

describe('Service: DragDropManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragDropManagerService]
    });
  });

  it('should ...', inject([DragDropManagerService], (service: DragDropManagerService) => {
    expect(service).toBeTruthy();
  }));
});
