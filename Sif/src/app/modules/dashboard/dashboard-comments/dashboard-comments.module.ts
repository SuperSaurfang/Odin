import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCommentsComponent } from './dashboard-comments.component';
import { DashboardRoutes } from './dashboard-comments.routing';
import { RestCommentService } from '../services';
import { DashboardCommentsListComponent } from './dashboard-comments-list/dashboard-comments-list.component';
import { DashboardCommentEditorComponent } from './dashboard-comment-editor/dashboard-comment-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    SharedModule
  ],
  declarations: [
    DashboardCommentsComponent,
    DashboardCommentsListComponent,
    DashboardCommentEditorComponent
  ],
  providers: [
    RestCommentService
  ]
})
export class DashboardCommentsModule { }
