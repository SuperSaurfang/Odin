/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostEditorService } from './post-editor.service';

describe('Service: PostEditor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostEditorService]
    });
  });

  it('should ...', inject([PostEditorService], (service: PostEditorService) => {
    expect(service).toBeTruthy();
  }));
});
