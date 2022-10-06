import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RestService } from '../rest/rest.service';
import { SearchRequest, SearchResult } from '../../models';

const DEFAULF_SEARCH_REQUEST: SearchRequest = {
  term: '',
  start: null,
  end: null,
  isTextSearch: true,
  isTitleSearch: false,
  isTagSearch: false,
  isCategorySearch: false,
};

@Injectable()
export class SearchService {
  private searchRequest = DEFAULF_SEARCH_REQUEST;
  private searchResultSubject: Subject<SearchResult> = new Subject<SearchResult>();

  constructor(private router: Router, private restService: RestService) { }

  /**
   * Search initialization with search term and redirect to search result view
   * @param searchTerm the searchterm
   */
  public initSearch(searchTerm: string) {
    this.searchRequest = DEFAULF_SEARCH_REQUEST;
    this.searchRequest.term = searchTerm;
    this.restService.postSearch(this.searchRequest).subscribe(result => {
      this.searchResultSubject.next(result);
    });
    this.router.navigate(['/search']);
  }

  public search(request: SearchRequest) {
    this.searchRequest = request;
    this.restService.postSearch(this.searchRequest).subscribe(result => {
      this.searchResultSubject.next(result);
    });
  }

  public getSearchRequest(): SearchRequest {
    // if the user reloads the search view page the search request object is set to default value
    // in this case user will be redirected to default view
    if (this.searchRequest.term === '') {
      this.router.navigate(['/blog']);
    }
    return this.searchRequest;
  }

  public getSearchResult(): Observable<SearchResult> {
    return this.searchResultSubject;
  }
}
