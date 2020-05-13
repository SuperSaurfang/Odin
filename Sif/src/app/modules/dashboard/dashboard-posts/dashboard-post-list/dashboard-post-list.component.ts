import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Article, EChangeResponse, Status } from 'src/app/core';

import { faCircle, faTrash, faFilter, faSlash } from '@fortawesome/free-solid-svg-icons';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

enum DateType {
  Create = 'create',
  Modification = 'modification'
}

interface Filter {
  startDate?: Date,
  endDate?: Date,
  dateType: DateType
  status: number,
}

@Component({
  selector: 'app-dashboard-post-list',
  templateUrl: './dashboard-post-list.component.html',
  styleUrls: ['./dashboard-post-list.component.scss']
})
export class DashboardPostListComponent implements OnInit {

  constructor(private restService: RestService) { }
  public Status = Status;
  public DateType = DateType;
  public displayedColumns: String[] = ['select', 'title', 'author', 'status', 'date']
  public statusIcon = faCircle;
  public trash = faTrash;
  public iconFilter = faFilter;
  public slash = faSlash;
  public datasource = new MatTableDataSource<Article>()
  public selection = new SelectionModel<Article>(true, [])

  public filter: Filter = {
    dateType: DateType.Create,
    status: Status.All
  }

  private data: Article[] = [];
  
  @ViewChild(MatSort, {static: true}) sort: MatSort

  public ngOnInit() {
    this.datasource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date':
          return item.creationDate
        default:
          return item[property];
      }
    }

    this.datasource.sort = this.sort;
    this.restService.getFullBlog().subscribe(articles => {
      this.datasource.data = articles;
      this.data = articles;
    });
  }

  public updateBlogEntry(article: Article) {
    this.restService.updateBlog(article).subscribe(response => {
      switch (response.ChangeResponse) {
        case EChangeResponse.Change:
          article.modificationDate = new Date(Date.now());
        case EChangeResponse.NoChange:
        case EChangeResponse.Error:
          break;
        default:
          break;
      }
    })
  }

  public setStatus(id: number, status: string) {
    if(status === 'draft' || status === 'private'  || status === 'public') {
      const index = this.datasource.data.findIndex(item => item.articleId === id);
      this.datasource.data[index].status = status;
      this.updateBlogEntry(this.datasource.data[index]);
    }
  }

  public isAllSelected() {
    const numberOfRows = this.datasource.data.length;
    const selectedRows = this.selection.selected.length;
    return numberOfRows === selectedRows;
  }

  public selectAll() {
    if(this.isAllSelected()) {
      this.selection.clear()
    } 
    else {
      this.datasource.data.forEach(row => this.selection.select(row));
    }
  }

  public updateStartDate(event: MatDatepickerInputEvent<Date>) {
    this.filter.startDate = event.value;
    this.applyFilter();
  }

  public updateEndDate(event: MatDatepickerInputEvent<Date>) {
    this.filter.endDate = event.value;
    this.applyFilter();
  }

  public applyFilter() {
    let filtered = this.data;
    if(this.filter.startDate) {
      if(this.filter.dateType === DateType.Create) {
        filtered = filtered.filter(item => item.creationDate >= this.filter.startDate);
      } else if(this.filter.dateType === DateType.Modification) {
        filtered = filtered.filter(item => item.modificationDate >= this.filter.startDate);
      }
    }

    if(this.filter.endDate) {
      if(this.filter.dateType === DateType.Create) {
        filtered = filtered.filter(item => item.creationDate <= this.filter.endDate);
      } else if(this.filter.dateType === DateType.Modification) {
        filtered = filtered.filter(item => item.modificationDate >= this.filter.endDate);
      }
    }

    switch (this.filter.status) {
      case Status.Trash:
        filtered = filtered.filter(item => item.status === 'trash');
        break;
      case Status.Draft:
        filtered = filtered.filter(item => item.status === 'draft');
        break;
      case Status.Private:
        filtered = filtered.filter(item => item.status === 'private');
        break;
      case Status.Public:
        filtered = filtered.filter(item => item.status === 'public');
        break;
      case Status.All:
      default:
        filtered = filtered.filter(item => item.status === 'draft' || item.status === 'private' || item.status === 'public');
        break;
    }
    console.log(filtered);
  }
}
