import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCommentsComponent } from './dashboard-comments.component';
import { DashboardRoutes } from './dashboard-comments.routing';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes
  ],
  declarations: [DashboardCommentsComponent]
})
export class DashboardCommentsModule { }
