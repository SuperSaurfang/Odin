import { Observable, Subject } from 'rxjs';

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
};

/**
 * Genric base class for filter service classes to filter a list of comments or articles
 * or something else that could be filtered between two dates, status and a search term
 * The TFilterObject is the target object type for the filter service
 */
export abstract class FilterBase<TFilterObject> {

  protected originObject: TFilterObject[] = [];
  protected filteredObject: Subject<TFilterObject[]> = new Subject<TFilterObject[]>();

  protected currentFilter: Filter = new Filter(BASE_FILTER);

  constructor() {}

  public abstract applyFilter(): void;

  public setFilterObject(listOfObject: TFilterObject[]) {
    this.currentFilter = new Filter(BASE_FILTER);
    this.originObject = listOfObject;
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
    this.filteredObject.next(this.originObject);
  }

  public filtered(): Observable<TFilterObject[]> {
    return this.filteredObject;
  }
}
