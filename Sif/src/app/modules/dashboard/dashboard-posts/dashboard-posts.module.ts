import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DashboardPostsComponent } from './dashboard-posts.component';
import { DashboardPostRoutes } from './dashboard-post.routing';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    FontAwesomeModule,
    SharedModule,
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
