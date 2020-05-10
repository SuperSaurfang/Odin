import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Article, EChangeResponse } from 'src/app/core';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-post-list',
  templateUrl: './dashboard-post-list.component.html',
  styleUrls: ['./dashboard-post-list.component.scss']
})
export class DashboardPostListComponent implements OnInit {

  constructor(private restService: RestService) { }

  public displayedColumns: String[] = ['select', 'title', 'author', 'status', 'date']
  public statusIcon = faCircle;
  public datasource = new MatTableDataSource<Article>()
  public selection = new SelectionModel<Article>(true, [])
  
  @ViewChild(MatSort, {static: true}) sort: MatSort

  public ngOnInit() {
    this.datasource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date':
            return item.creationDate;
        default:
          return item[property];
      }
    }
    this.datasource.sort = this.sort;
    this.restService.getFullBlog().subscribe(articles => {
      this.datasource.data = articles;
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
    if(status === 'draft' || status === 'private' || status === 'public') {
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
}
