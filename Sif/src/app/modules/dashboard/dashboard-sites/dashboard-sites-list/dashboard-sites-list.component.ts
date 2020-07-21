import { Component, OnInit } from '@angular/core';
import { ListFilterEvent } from '../../shared-components/list-action-bar/list-action-bar.component';
import { ArticleFilterService } from '../../services/article-filter/article-filter.service';

@Component({
  selector: 'app-dashboard-sites-list',
  templateUrl: './dashboard-sites-list.component.html',
  styleUrls: ['./dashboard-sites-list.component.scss']
})
export class DashboardSitesListComponent implements OnInit {

  constructor(private articleFilter: ArticleFilterService) { }

  ngOnInit() {
  }

  public listActionUpdate(event: ListFilterEvent) {
    console.log(event);
  }

  public executeAction(event: string) {
    console.log(event);
  }

  public clearTrash() {
    console.log('Clear trash');
  }

}
