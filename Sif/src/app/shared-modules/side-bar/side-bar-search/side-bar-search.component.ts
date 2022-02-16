import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-side-bar-search',
  templateUrl: './side-bar-search.component.html',
  styleUrls: ['./side-bar-search.component.scss']
})
export class SideBarSearchComponent implements OnInit {

  public term = '';
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  startSearch() {
    if (this.term) {
      this.searchService.initSearch(this.term);
    }
  }
}
