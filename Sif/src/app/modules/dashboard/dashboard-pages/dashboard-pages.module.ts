import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListActionBarModule } from '../shared-dashboard-modules/list-action-bar/list-action-bar.module';
import { ArticleSettingModule } from '../shared-dashboard-modules/article-setting/article-setting.module';
import { SharedModule } from '../../../shared/shared.module';

import { DashboardPagesRoutes } from './dashboard-pages.routing';
import { DashboardPagesComponent } from './dashboard-pages.component';
import { DashboardPagesListComponent } from './dashboard-pages-list/dashboard-pages-list.component';
import { DashboardPagesEditorComponent } from './dashboard-pages-editor/dashboard-pages-editor.component';
import { RestPageService, ArticleFilterService } from '../services';
import { StatusChangeMenuModule } from '../shared-dashboard-modules/status-change-menu/status-change-menu.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { PageEditorService } from '../services/page-editor/page-editor.service';


@NgModule({
  imports: [
    CommonModule,
    DashboardPagesRoutes,
    FormsModule,
    FontAwesomeModule,
    ListActionBarModule,
    ArticleSettingModule,
    SharedModule,
    StatusChangeMenuModule,
    FontAwesomeModule,
    CKEditorModule
  ],
  declarations: [
    DashboardPagesComponent,
    DashboardPagesListComponent,
    DashboardPagesEditorComponent,
  ],
  providers: [
    ArticleFilterService,
    RestPageService,

    { provide: ArticleEditorService, useClass: PageEditorService}
  ]
})
export class DashboardPagesModule { }
