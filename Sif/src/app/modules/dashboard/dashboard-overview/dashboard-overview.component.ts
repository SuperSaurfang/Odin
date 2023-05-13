import { Component, OnInit } from '@angular/core';
import { GridsterItem, GridsterConfig, GridsterComponentInterface } from 'angular-gridster2';
import { GridsterItemComponentInterface } from 'angular-gridster2/public_api';
import { ArticleEditorService, GridsterItemWithComponent } from 'src/app/core';
import { DashboardQuickCreateComponent } from './dashboard-quick-create/dashboard-quick-create.component';
import { DashboardNewestCommentsComponent } from './dashboard-newest-comments/dashboard-newest-comments.component';
import { DashboardNoticesComponent } from './dashboard-notices/dashboard-notices.component';
import { PostEditorService } from '../services';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  

  constructor() { }

  public config: GridsterConfig

  public items: GridsterItemWithComponent[];

  ngOnInit() {
    this.config = {
      displayGrid: 'none',
      initCallback: (gridster) => this.init(gridster),
      maxCols: 5,
      minCols: 2,
      margin: 8,
      itemChangeCallback: (item, itemComponent) => this.itemChanged(item, itemComponent),
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      swapWhileDragging: true
    }

    this.items = [
      {
        cols: 1, 
        rows: 3, 
        y: 0, 
        x: 0,
        component: DashboardQuickCreateComponent,
      },
      {
        cols: 1, 
        rows: 3, 
        y: 0, 
        x: 1,
        component: DashboardNewestCommentsComponent
      },
      {
        cols: 1,
        rows: 6, 
        y: 0, 
        x: 2,
        component: DashboardNoticesComponent
      },
    ];
  }

  private init(gridster: GridsterComponentInterface) {
    console.log(gridster);
  }

  private itemChanged(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    console.log('item:');
    console.log(item);
    console.log('itemComponent:');
    console.log(itemComponent);
  }

}
