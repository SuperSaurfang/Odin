import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import { GridsterModule } from 'angular-gridster2';
import { DashboardItemDirective } from 'src/app/core/directive/dashboard-item.directive';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule
  ],
  declarations: [
    DashboardItemDirective,
    DashboardOverviewComponent
  ]
})
export class DashboardOverviewModule { }
