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
import { ArticleFilterService } from '../services';
import { RestPostsService } from '../services/rest-posts/rest-posts.service';
import { StatusChangeMenuModule } from '../shared-dashboard-modules/status-change-menu/status-change-menu.module';
import { DashboardPostTagEditorComponent } from './dashboard-post-tag-editor/dashboard-post-tag-editor.component';
import { DashboardPostCategoryEditorComponent } from './dashboard-post-category-editor/dashboard-post-category-editor.component';
import { RestCategoryService } from '../services/rest-category/rest-category.service';
import { CategoryService } from '../services/category/category.service';
import { PostEditorService } from '../services/post-editor/post-editor.service';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { HintboxModule } from 'src/app/shared-modules/hintbox/hintbox.module';




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
    StatusChangeMenuModule,
    HintboxModule
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
    CategoryService,

    { provide: ArticleEditorService, useClass: PostEditorService }
  ]
})
export class DashboardPostsModule {
}
