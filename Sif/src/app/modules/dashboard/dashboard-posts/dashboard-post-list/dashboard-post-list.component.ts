import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Article, ChangeResponse, EChangeResponse } from 'src/app/core';

import { faTrash, faFilter, faSlash, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ArticleFilterService, DateFilter } from '../../services/article-filter/article-filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-post-list',
  templateUrl: './dashboard-post-list.component.html',
  styleUrls: ['./dashboard-post-list.component.scss']
})
export class DashboardPostListComponent implements OnInit {

  constructor(private restService: RestService, private articleFilter: ArticleFilterService) { }

  public articles: Article[] = [];
  public isAllSelected = false;
  public isIndeterminate = false;
  public selectedArticles: boolean[] = [];

  public iconTrash = faTrash;
  public iconFilter = faFilter;
  public iconSlash = faSlash;
  public iconStatus = faCircle;

  public selectedAction = '';
  public statusMenuOpen = -1;

  public selectedStatus = 'all';
  public searchTerm: string;
  public startDate: Date;
  public endDate: Date;

  public articleFilterSubscription: Subscription;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.restService.getFullBlog().subscribe(articles => {
      this.articleFilterSubscription = this.articleFilter.filtered().subscribe(filteredArticles => {
        this.articles = filteredArticles;
      });
      this.articleFilter.setArticles(articles);
      this.selectedArticles = [];
      articles.forEach(() => {
        this.selectedArticles.push(false);
      });
    });
  }

  public getSelected(index: number) {
    return this.selectedArticles[index];
  }

  public setSelected(index: number) {
    this.selectedArticles[index] = !this.selectedArticles[index];
    const result = this.selectedArticles.filter(a => a === true);
    if (result.length === this.articles.length) {
      this.isAllSelected = true;
      this.isIndeterminate = false;
    } else if (result.length === 0) {
      this.isIndeterminate = false;
      this.isAllSelected = false;
    } else {
      this.isIndeterminate = true;
      this.isAllSelected = false;
    }
  }

  public setAllSelected(isAllSelected: boolean) {
    this.isAllSelected = isAllSelected;
    for (let index = 0; index < this.selectedArticles.length; index++) {
      this.isIndeterminate = false;
      if (this.isAllSelected) {
        this.selectedArticles[index] = true;
      } else {
        this.selectedArticles[index] = false;
      }
    }
  }

  public changeStatusFilter() {
    this.articleFilter.updateStatusFilter(this.selectedStatus);
  }

  public changeSearchterm() {
    this.articleFilter.searchFilter(this.searchTerm);
  }

  public changeDateFilter() {
    const dateFilter: DateFilter = {};
    if (this.endDate) {
      dateFilter.endDate = new Date(this.endDate);
      dateFilter.endDate.setHours(23, 59, 59);
    }
    if (this.startDate) {
      dateFilter.startDate = new Date(this.startDate);
      dateFilter.startDate.setHours(0, 0, 0, 0);
    }
    this.articleFilter.updateDateFilter(dateFilter);
  }

  public resetFilter() {
    this.selectedStatus = 'all';
    this.startDate = null;
    this.endDate = null;
    this.searchTerm = '';
    this.articleFilter.resetFilter();
  }

  public executeAction() {
    if (this.selectedAction === '' || this.selectedArticles.filter(a => a === true).length === 0)  {
      console.log('Nothing selected');
      return;
    }
    for (let index = 0; index < this.articles.length; index++) {
      if (this.selectedArticles[index]) {
        this.updateStatus(this.selectedAction, index);
      }
    }
  }

  public openStatusChange(index: number) {
    this.statusMenuOpen = index;
  }

  public updateStatus(status: string, index: number) {
    this.statusMenuOpen = -1;
    this.articles[index].status = status;
    this.restService.updateBlog(this.articles[index]).subscribe(response => {
      switch (response.ChangeResponse) {
        case EChangeResponse.Change:
          this.articleFilter.applyFilter();
          console.log('everything okay');
          break;
        case EChangeResponse.Error:
        case EChangeResponse.NoChange:
        default:
          console.log('Something goes wrong');
          break;
      }
    });
  }

  public deleteArticles() {
    this.restService.deleteArticles().subscribe(response => {
      switch (response.ChangeResponse) {
        case EChangeResponse.Change:
          this.articleFilterSubscription.unsubscribe();
          this.loadData();
          break;
        case EChangeResponse.Error:
        case EChangeResponse.NoChange:
        default:
          break;
      }
    });
  }


  public getStatusTooltip(status: string) {
    switch (status) {
      case 'draft':
        return 'Status: Entwurf';
      case 'private':
        return 'Status: Privat';
      case 'public':
        return 'Status: Veröffentlicht';
      default:
        return 'Papierkorb';
    }
  }
}
