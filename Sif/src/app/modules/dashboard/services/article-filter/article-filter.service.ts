import { Injectable } from '@angular/core';
import { Article } from 'src/app/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export class DateFilter {
  public startDate?: Date;
  public endDate?: Date;
}

class Filter {
  constructor(filter: Filter) {
    this.dateFilter = filter.dateFilter;
    this.status = filter.status;
    this.searchTerm = filter.searchTerm;
  }
  public dateFilter: DateFilter;
  public status: string;
  public searchTerm: string;
}

const BASE_FILTER: Filter = {
  dateFilter: new DateFilter(),
  searchTerm: '',
  status: 'all'
}

@Injectable()
export class ArticleFilterService {

  private originArticles: Article[] = [];
  private filteredArticles: Subject<Article[]> = new Subject<Article[]>();

  private currentFilter: Filter = new Filter(BASE_FILTER)

  constructor() { }

  public setArticles(articles: Article[]) {
    this.originArticles = articles;
    this.applyFilter();
  }

  public updateDateFilter(dateFilter: DateFilter) {
    this.currentFilter.dateFilter = dateFilter;
    this.applyFilter();
  }

  public updateStatusFilter(status: string) {
    this.currentFilter.status = status;
    this.applyFilter();
  }

  public searchFilter(searchTerm: string) {
    this.currentFilter.searchTerm = searchTerm;
    this.applyFilter();
  }

  public resetFilter() {
    this.currentFilter = new Filter(BASE_FILTER);
    this.filteredArticles.next(this.originArticles);
  }


  public applyFilter() {
    let filtered = this.originArticles;
    //filter period
    if (!this.currentFilter.dateFilter.startDate && this.currentFilter.dateFilter.endDate) 
    {
      filtered = filtered.filter(article => article.modificationDate <= this.currentFilter.dateFilter.endDate);
    } 
    else if (!this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) 
    {
      filtered = filtered.filter(article => article.modificationDate >= this.currentFilter.dateFilter.startDate);
    } 
    else if(this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) 
    {
      filtered = filtered.filter(article => article.modificationDate >= this.currentFilter.dateFilter.startDate
        && article.modificationDate <= this.currentFilter.dateFilter.endDate);
    }

    //filter status
    if (this.currentFilter.status !== 'all') 
    {
      filtered = filtered.filter(article => article.status === this.currentFilter.status)
    }

    //simple search
    if (this.currentFilter.searchTerm.length > 0) 
    {
      filtered = filtered.filter(article => article.author.includes(this.currentFilter.searchTerm) || article.title.includes(this.currentFilter.searchTerm))
    }
    this.filteredArticles.next(filtered);
  }

  public filtered(): Observable<Article[]> {
    return this.filteredArticles;
  }

}
