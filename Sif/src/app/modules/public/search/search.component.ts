import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSearch, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SearchRequest, SearchResult } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchIcon = faSearch;
  public extendedSettingsIcon = faAngleDown;
  public searchRequest: SearchRequest = new SearchRequest();

  public isChecked = false;
  public showExtendedOptions = false;

  public searchForm = this.formBuilder.group({
    term: [''],
    from: [''],
    to: [''],
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
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onShowExtendedOptionsChange() {
    this.showExtendedOptions = !this.showExtendedOptions;
    if (this.showExtendedOptions) {
      this.extendedSettingsIcon = faAngleUp;
    } else {
      this.extendedSettingsIcon = faAngleDown;
    }
  }

  public onStartSearch() {
    const searchRequest = this.searchForm.value as SearchRequest;
    this.searchService.search(searchRequest);
  }

}
