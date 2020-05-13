import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardPostsModule } from './dashboard-posts/dashboard-posts.module';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardPostsModule,
    FontAwesomeModule,
    SharedModule,
    DashboardRoutes
  ],
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent
  ]

})
export class DashboardModule { }
