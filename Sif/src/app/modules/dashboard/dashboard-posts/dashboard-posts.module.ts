import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleSettingModule } from '../shared-dashboard-modules/article-setting/article-setting.module';

import { DashboardPostsComponent } from './dashboard-posts.component';
import { DashboardPostRoutes } from './dashboard-post.routing';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';
import { ListActionBarModule } from '../shared-dashboard-modules/list-action-bar/list-action-bar.module';




@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    DashboardPostRoutes,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ArticleSettingModule,
    ListActionBarModule
  ],
  declarations: [
    DashboardPostsComponent,
    DashboardPostListComponent,
    DashboardPostEditorComponent,
  ]
})
export class DashboardPostsModule {
}
