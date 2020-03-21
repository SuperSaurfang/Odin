import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPostsComponent } from './dashboard-posts.component';
import { DashboardPostRoutes } from './dashboard-post.routing';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardPostRoutes
  ],
  declarations: [
    DashboardPostsComponent,
    DashboardPostListComponent,
    DashboardPostEditorComponent
  ]
})
export class DashboardPostsModule {
}
