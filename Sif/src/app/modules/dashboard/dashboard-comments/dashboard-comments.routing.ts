import { Routes, RouterModule } from '@angular/router';
import { DashboardCommentEditorComponent } from './dashboard-comment-editor/dashboard-comment-editor.component';
import { DashboardCommentsListComponent } from './dashboard-comments-list/dashboard-comments-list.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: DashboardCommentsListComponent },
    { path: 'edit/:id', component: DashboardCommentEditorComponent }
  ]},
];

export const DashboardRoutes = RouterModule.forChild(routes);
