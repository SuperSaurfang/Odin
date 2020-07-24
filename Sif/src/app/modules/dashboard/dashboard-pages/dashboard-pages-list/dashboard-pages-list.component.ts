import { Component, OnInit } from '@angular/core';
import { ListFilterEvent } from '../../shared-dashboard-modules/list-action-bar/list-action-bar.component';
import { ArticleFilterService } from '../../services/article-filter/article-filter.service';

@Component({
  selector: 'app-dashboard-pages-list',
  templateUrl: './dashboard-pages-list.component.html',
  styleUrls: ['./dashboard-pages-list.component.scss']
})
export class DashboardPagesListComponent implements OnInit {

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
