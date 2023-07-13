import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import { GridsterModule } from 'angular-gridster2';
import { DashboardItemDirective } from 'src/app/core/directive/dashboard-item.directive';
import { DashboardQuickCreateComponent } from './dashboard-quick-create/dashboard-quick-create.component';
import { DashboardNewestCommentsComponent } from './dashboard-newest-comments/dashboard-newest-comments.component';
import { DashboardNoticesComponent } from './dashboard-notices/dashboard-notices.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestCommentService } from '../services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentStatusPipe } from 'src/app/core/pipes/comment-status/comment-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    GridsterModule
  ],
  declarations: [
    DashboardItemDirective,
    DashboardOverviewComponent,
    DashboardQuickCreateComponent,
    DashboardNewestCommentsComponent,
    DashboardNoticesComponent,
    CommentStatusPipe
  ],
  providers: [
    RestCommentService,
  ]
})
export class DashboardOverviewModule { }
