import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListActionBarModule } from '../shared-components/list-action-bar/list-action-bar.module';
import { ArticleSettingModule } from '../shared-components/article-setting/article-setting.module';

import { DashboardSitesRoutes } from './dashboard-sites.routing';
import { DashboardSitesComponent } from './dashboard-sites.component';
import { DashboardSitesListComponent } from './dashboard-sites-list/dashboard-sites-list.component';
import { DashboardSitesEditorComponent } from './dashboard-sites-editor/dashboard-sites-editor.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardSitesRoutes,
    FormsModule,
    FontAwesomeModule,
    ListActionBarModule,
    ArticleSettingModule
  ],
  declarations: [
    DashboardSitesComponent,
    DashboardSitesListComponent,
    DashboardSitesEditorComponent,
  ]
})
export class DashboardSitesModule { }
