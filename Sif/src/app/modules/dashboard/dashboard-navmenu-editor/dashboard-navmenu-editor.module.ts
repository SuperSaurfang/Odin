import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavmenuEditorComponent } from './dashboard-navmenu-editor.component';
import { DashboardNavmenuEditorRoutes } from './dashboard-navmenu-editor.routing';
import { RestNavmenuService } from '../services/rest-navmenu/rest-navmenu.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardNavmenuEntryComponent } from './dashboard-navmenu-entry/dashboard-navmenu-entry.component';
import { NavmenuService } from '../services';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    DashboardNavmenuEditorRoutes
  ],
  declarations: [
    DashboardNavmenuEditorComponent,
    DashboardNavmenuEntryComponent
  ],
  providers: [
    RestNavmenuService,
    NavmenuService
  ]
})
export class DashboardNavmenuEditorModule { }
