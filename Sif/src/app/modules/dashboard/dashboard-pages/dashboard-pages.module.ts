import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListActionBarModule } from '../shared-dashboard-modules/list-action-bar/list-action-bar.module';
import { ArticleSettingModule } from '../shared-dashboard-modules/article-setting/article-setting.module';

import { DashboardPagesRoutes } from './dashboard-pages.routing';
import { DashboardPagesComponent } from './dashboard-pages.component';
import { DashboardPagesListComponent } from './dashboard-pages-list/dashboard-pages-list.component';
import { DashboardPagesEditorComponent } from './dashboard-pages-editor/dashboard-pages-editor.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardPagesRoutes,
    FormsModule,
    FontAwesomeModule,
    ListActionBarModule,
    ArticleSettingModule
  ],
  declarations: [
    DashboardPagesComponent,
    DashboardPagesListComponent,
    DashboardPagesEditorComponent,
  ]
})
export class DashboardPagesModule { }
