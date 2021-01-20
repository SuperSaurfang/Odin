import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ListFilterEvent, FilterType } from '../../shared-dashboard-modules/list-action-bar/list-action-bar.component';
import { ArticleFilterService, DateFilter } from '../../services/article-filter/article-filter.service';
import { Article, ChangeResponse } from 'src/app/core';
import { RestPageService } from '../../services';
import { Subscription } from 'rxjs';
import { faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-pages-list',
  templateUrl: './dashboard-pages-list.component.html',
  styleUrls: ['./dashboard-pages-list.component.scss']
})
export class DashboardPagesListComponent implements OnInit, OnChanges {

  constructor(private articleFilter: ArticleFilterService, private restService: RestPageService) { }


  public isIndeterminete = false;
  public isAllSelected = false;
  public articles: Article[] = [];
  public selectedArticles: boolean[] = [];

  public iconStatus = faCircle;
  public iconTrash = faTrash;

  public statusMenuOpen = -1;

  private articleFilterSubscription: Subscription;

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.statusMenuOpen);
  }

  private loadData() {
    this.restService.getPages().subscribe(articles => {
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

  private updateDateFilter(startDate: Date, endDate: Date) {
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

  public updateStatus(status: string, index: number) {
    this.articles[index].status = status;
    this.restService.updatePage(this.articles[index]).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.articleFilter.applyFilter();
          console.log('everything okay');
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          console.log('Something goes wrong');
          break;
      }
      this.statusMenuOpen = -1;
    });
  }

  public listFilterUpdate(event: ListFilterEvent) {
    switch (event.filterType) {
      case FilterType.Date:
        this.updateDateFilter(event.listFilterModel.startDate, event.listFilterModel.endDate);
        break;
      case FilterType.Reset:
        this.articleFilter.resetFilter();
        break;
      case FilterType.SearchTerm:
        this.articleFilter.searchFilter(event.listFilterModel.searchTerm);
        break;
      case FilterType.Status:
        this.articleFilter.updateStatusFilter(event.listFilterModel.selectedStatus);
        break;
      default:
        break;
    }
  }

  public executeAction(event: string) {
    if (event === '' || this.selectedArticles.filter(a => a === true).length === 0) {
      console.log('Nothing selected');
      return;
    }
    for (let index = 0; index < this.selectedArticles.length; index++) {
      if (this.selectedArticles[index]) {
        this.updateStatus(event, index);
      }
    }
  }

  public clearTrash() {
    this.restService.deletePages().subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.articleFilterSubscription.unsubscribe();
          this.loadData();
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          break;
      }
    });
  }

  public setAllSelected(event: boolean) {
    this.isAllSelected = event;
    this.isIndeterminete = false;
    for (let index = 0; index < this.selectedArticles.length; index++) {
      if (this.isAllSelected) {
        this.selectedArticles[index] = true;
      } else {
        this.selectedArticles[index] = false;
      }
    }
  }

  public setSelectedArticle(index: number) {
    this.selectedArticles[index] = !this.selectedArticles[index];
    const result = this.selectedArticles.filter(a => a === true);
    if (result.length === this.articles.length) {
      this.isAllSelected = true;
      this.isIndeterminete = false;
    } else if (result.length === 0) {
      this.isAllSelected = false;
      this.isIndeterminete = false;
    } else {
      this.isAllSelected = false;
      this.isIndeterminete = true;
    }
  }

  public openStatusChangeMenu(index: number) {
    this.statusMenuOpen = index;
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
