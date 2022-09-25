import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paging } from 'src/app/core/models/paging';

export enum PageChangeType {
  FirstPage,
  PreviousPage,
  NextPage,
  LastPage
}

export interface PageChangeEvent {
  page: number;
  type: PageChangeType;
}


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input()
  public paging: Paging = new Paging();

  @Output()
  public pageChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {
  }


  public firstPage() {
    const firstPage = this.paging.totalPages / this.paging.totalPages;
    this.pageChange.emit({
      page: firstPage,
      type: PageChangeType.FirstPage
    })
  }

  public lastPage() {
    this.pageChange.emit({
      page: this.paging.totalPages,
      type: PageChangeType.LastPage
    })
  }

  public goPage(page: number) {
    if(page === this.paging.currentPage) return;

    var type = PageChangeType.PreviousPage;
    if(page > this.paging.currentPage) {
      type = PageChangeType.NextPage;
    }

    this.pageChange.emit({
      page: page,
      type: type
    })
  }

  public get pageIterator() {
    const pageNumbers: number[] = [];
    for (let index = 0; index < this.paging.totalPages; index++) {
      const page = index + 1;
      if(this.validatePageNumber(page)){
        pageNumbers.push(page);
      }
    }
    return pageNumbers;
  }


  private validatePageNumber(page: number) {
    const ONE = 1;
    const TWO = 2;
    let validPageNumber = 0;
    
    if(this.paging.currentPage === ONE) {
      validPageNumber = this.paging.currentPage + TWO;
      if(page <= validPageNumber) {
        return true;
      }
    }

    if(this.paging.currentPage === this.paging.totalPages) {
      validPageNumber = this.paging.totalPages - TWO;
      if(page >= validPageNumber) {
        return true;
      }
    }

    const previousPage = this.paging.currentPage - ONE;
    const nextPage = this.paging.currentPage + ONE;
    return previousPage === page || page === this.paging.currentPage || nextPage === page;
  }
}
