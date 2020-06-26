import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardPostsModule } from './dashboard-posts/dashboard-posts.module';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';

import { ArticleFilterService } from './services/article-filter/article-filter.service';

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
  ],
  providers: [
    ArticleFilterService
  ]
})
export class DashboardModule { }
