/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageEditorService } from './page-editor.service';

describe('Service: PageEditor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageEditorService]
    });
  });

  it('should ...', inject([PageEditorService], (service: PageEditorService) => {
    expect(service).toBeTruthy();
  }));
});
