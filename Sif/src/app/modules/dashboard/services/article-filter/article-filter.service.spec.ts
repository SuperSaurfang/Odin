/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleFilterService } from './article-filter.service';

describe('Service: ArticleFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleFilterService]
    });
  });

  it('should ...', inject([ArticleFilterService], (service: ArticleFilterService) => {
    expect(service).toBeTruthy();
  }));
});
