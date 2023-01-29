import { Component, OnInit } from '@angular/core';
import { Article, ChangeResponse, Status } from 'src/app/core';

import { ArticleFilterService, RestPostsService } from '../../services';
import { Subscription } from 'rxjs';
import { ListFilterEvent, FilterType } from '../../shared-dashboard-modules/list-action-bar/list-action-bar.component';
import { DateFilter } from 'src/app/core/baseClass';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-post-list',
  templateUrl: './dashboard-post-list.component.html',
  styleUrls: ['./dashboard-post-list.component.scss']
})
export class DashboardPostListComponent implements OnInit {

  constructor(private restService: RestPostsService,
    private articleFilter: ArticleFilterService,
    private notificationService: NotificationService) { }

  public articles: Article[] = [];
  public isAllSelected = false;
  public isIndeterminate = false;
  public selectedArticles: boolean[] = [];

  public statusMenuOpen = -1;

  public articleFilterSubscription: Subscription;

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.notificationService.startProcess('Artikel werden geladen');
    this.restService.getFullBlog().subscribe(articles => {
      if (articles.length === 0) {
        this.notificationService.startProcess('Artikel konnten nicht geladen werden');
      }

      this.articleFilterSubscription = this.articleFilter.filtered().subscribe(filteredArticles => {
        this.articles = filteredArticles;
      });
      this.articleFilter.setFilterObject(articles);
      this.selectedArticles = [];
      articles.forEach(() => {
        this.selectedArticles.push(false);
      });
      this.notificationService.stopProcess('Artikel geladen');
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

  public listFilterUpdate(event: ListFilterEvent) {
    switch (event.filterType) {
      case FilterType.Date:
        this.changeDateFilter(event.listFilterModel.startDate, event.listFilterModel.endDate);
        break;
      case FilterType.Status:
        this.changeStatusFilter(event.listFilterModel.selectedStatus);
        break;
      case FilterType.SearchTerm:
        this.changeSearchterm(event.listFilterModel.searchTerm);
        break;
      case FilterType.Reset:
        this.resetFilter();
        break;
      default:
        break;
    }
  }

  public changeStatusFilter(selectedStatus: string) {
    this.articleFilter.updateStatusFilter(selectedStatus);
  }

  public changeSearchterm(searchTerm: string) {
    this.articleFilter.searchFilter(searchTerm);
  }

  public changeDateFilter(startDate: Date, endDate: Date) {
    const dateFilter: DateFilter = {};
    if (endDate) {
      dateFilter.endDate = new Date(endDate);
      dateFilter.endDate.setHours(23, 59, 59);
    }
    if (startDate) {
      dateFilter.startDate = new Date(startDate);
      dateFilter.startDate.setHours(0, 0, 0, 0);
    }
    this.articleFilter.updateDateFilter(dateFilter);
  }

  public resetFilter() {
    this.articleFilter.resetFilter();
  }

  public executeAction(event: string) {
    if (event === '' || this.selectedArticles.filter(a => a === true).length === 0)  {
      console.log('Nothing selected');
      return;
    }

    this.notificationService.startProcess('Aktion wird ausgeführt');
    for (let index = 0; index < this.articles.length; index++) {
      if (this.selectedArticles[index]) {
        this.updateStatus(event, index);
      }
    }
    this.notificationService.stopProcess('Aktion wurde ausgeführt');
  }

  public openStatusChange(index: number) {
    this.statusMenuOpen = index;
  }

  public updateStatus(status: string, index: number) {
    this.statusMenuOpen = -1;
    this.articles[index].status = status;
    const notification = {
      date: new Date(Date.now()),
      message: `Artikelstatus erfolgreich aktualisiert`,
      status: Status.Ok
    };
    this.restService.updateBlog(this.articles[index]).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.articleFilter.applyFilter();
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim aktualisieren des Artikelstatus';
          notification.status = Status.Error;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Artikelstatus wurde nicht aktualisiert';
          notification.status = Status.Warning;
          break;
        default:
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public deleteArticles() {
    const notification = {
      date: new Date(Date.now()),
      message: 'Papierkorb wurde geleert',
      status: Status.Ok
    };
    this.restService.deleteArticles().subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.articleFilterSubscription.unsubscribe();
          this.loadData();
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim leeren des Papierkorbes';
          notification.status = Status.Error;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Papierkorb wurde nicht geleert';
          notification.status = Status.Warning;
          break;
        default:
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public onMenuClose(event: boolean) {
    if (!event) {
      this.statusMenuOpen = -1;
    }
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
