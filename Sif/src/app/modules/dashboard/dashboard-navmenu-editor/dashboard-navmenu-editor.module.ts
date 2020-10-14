import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavmenuEditorComponent } from './dashboard-navmenu-editor.component';
import { DashboardNavmenuEditorRoutes } from './dashboard-navmenu-editor.routing';
import { RestNavmenuService } from '../services/rest-navmenu/rest-navmenu.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardNavmenuEditorRoutes
  ],
  declarations: [
    DashboardNavmenuEditorComponent,
  ],
  providers: [
    RestNavmenuService
  ]
})
export class DashboardNavmenuEditorModule { }
