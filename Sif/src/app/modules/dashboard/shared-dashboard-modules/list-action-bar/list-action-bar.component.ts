import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { faTrash, faFilter, faSlash, faCircle } from '@fortawesome/free-solid-svg-icons';

export enum FilterType {
  Status,
  SearchTerm,
  Date,
  Reset
}

export class ListFilterModel {
  public selectedStatus = 'all';
  public searchTerm: string;
  public startDate: Date;
  public endDate: Date;
}

export class ListFilterEvent {
  public filterType: FilterType;
  public listFilterModel: ListFilterModel;
}


@Component({
  selector: 'app-list-action-bar',
  templateUrl: './list-action-bar.component.html',
  styleUrls: ['./list-action-bar.component.scss']
})
export class ListActionBarComponent implements OnInit {

  constructor() { }

  public iconTrash = faTrash;
  public iconFilter = faFilter;
  public iconSlash = faSlash;
  public iconStatus = faCircle;

  public selectedAction = '';
  public listAction: ListFilterModel = new ListFilterModel();

  @Output()
  public ListFilterUpdate = new EventEmitter<ListFilterEvent>();

  @Output()
  public ExecuteAction = new EventEmitter<string>();

  @Output()
  public ClearTrash = new EventEmitter();

  ngOnInit() {
  }

  public executeAction() {
    this.ExecuteAction.emit(this.selectedAction);
  }

  public changeDateFilter() {
    const event = new ListFilterEvent();
    event.filterType = FilterType.Date;
    event.listFilterModel = this.listAction;
    this.ListFilterUpdate.emit(event);
  }

  public changeStatusFilter() {
    const event = new ListFilterEvent();
    event.filterType = FilterType.Status;
    event.listFilterModel = this.listAction;
    this.ListFilterUpdate.emit(event);
  }

  public changeSearchterm() {
    const event = new ListFilterEvent();
    event.filterType = FilterType.SearchTerm;
    event.listFilterModel = this.listAction;
    this.ListFilterUpdate.emit(event);
  }

  public resetFilter() {
    this.listAction = new ListFilterModel();
    const event = new ListFilterEvent();
    event.filterType = FilterType.Reset;
    event.listFilterModel = this.listAction;
    this.ListFilterUpdate.emit(event);
  }

  public clearTrash() {
    this.ClearTrash.emit();
  }

}
