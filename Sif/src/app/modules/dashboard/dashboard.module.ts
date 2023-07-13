import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutes } from './dashboard.routing';
import { DashboardPostsModule } from './dashboard-posts/dashboard-posts.module';
import { DashboardPagesModule } from './dashboard-pages/dashboard-pages.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardNotificationComponent } from './dashboard-notification/dashboard-notification.component';
import { DashboardNotificationLogComponent } from './dashboard-notification/dashboard-notification-log/dashboard-notification-log.component';

import { NotificationService } from './services/notification/notification.service';
import { DashboardOverviewModule } from './dashboard-overview/dashboard-overview.module';



@NgModule({
  imports: [
    CommonModule,
    DashboardPostsModule,
    DashboardOverviewModule,
    DashboardPagesModule,
    FontAwesomeModule,
    SharedModule,
    DashboardRoutes
  ],
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardNotificationComponent,
    DashboardNotificationLogComponent
  ],
  providers: [
    NotificationService
  ]
})
export class DashboardModule { }
