import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardPostsComponent } from './dashboard-posts.component';
import { DashboardPostRoutes } from './dashboard-post.routing';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';
import { DashboardPostTagEditorComponent } from './dashboard-post-tag-editor/dashboard-post-tag-editor.component';
import { DashboardPostCategoryEditorComponent } from './dashboard-post-category-editor/dashboard-post-category-editor.component';
import { ArticleFilterService,
  RestTagService,
  TagService,
  RestPostsService,
  RestCategoryService,
  CategoryService,
  PostEditorService } from '../services';
import { ListActionBarModule, StatusChangeMenuModule, ArticleSettingModule } from '../shared-dashboard-modules';
import { ArticleEditorService } from 'src/app/core';




@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    DashboardPostRoutes,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ArticleSettingModule,
    ListActionBarModule,
    StatusChangeMenuModule
  ],
  declarations: [
    DashboardPostsComponent,
    DashboardPostListComponent,
    DashboardPostEditorComponent,
    DashboardPostTagEditorComponent,
    DashboardPostCategoryEditorComponent
  ],
  providers: [
    ArticleFilterService,
    RestPostsService,
    RestCategoryService,
    RestTagService,
    CategoryService,
    TagService,
    { provide: ArticleEditorService, useClass: PostEditorService }
  ]
})
export class DashboardPostsModule {
}
