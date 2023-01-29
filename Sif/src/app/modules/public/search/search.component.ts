import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchRequest, SearchResult } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchRequest: SearchRequest = new SearchRequest();

  public searchForm = this.formBuilder.group({
    term: [''],
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    isTextSearch: [false],
    isTitleSearch: [false],
    isTagSearch: [false],
    isCategorySearch: [false],
  });

  public searchResult: SearchResult = new SearchResult();

  private subscription: Subscription;

  constructor(private searchService: SearchService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchRequest = this.searchService.getSearchRequest();
    this.searchForm.setValue(this.searchRequest);
    this.subscription = this.searchService.getSearchResult().subscribe(result => {
      this.searchResult = result;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onStartSearch() {
    const searchRequest = this.searchForm.value as SearchRequest;
    this.searchService.search(searchRequest);
  }

}
