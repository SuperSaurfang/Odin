import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBlogSettingsComponent } from './dashboard-blog-settings.component';
import { DashboardBlogSettingsRoutes } from './dashboard-blog-settings.routing';

@NgModule({
  imports: [
    CommonModule,
    DashboardBlogSettingsRoutes
  ],
  declarations: [DashboardBlogSettingsComponent]
})
export class DashboardBlogSettingsModule { }
