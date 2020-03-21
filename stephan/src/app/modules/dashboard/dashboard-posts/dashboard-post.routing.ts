import { Routes, RouterModule } from '@angular/router';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';

const routes: Routes = [
  { path: '',  children: [
    { path: '',  component: DashboardPostListComponent },
    { path: 'edit', component: DashboardPostEditorComponent },
    { path: 'edit/:id', component: DashboardPostEditorComponent }
  ]}
];

export const DashboardPostRoutes = RouterModule.forChild(routes);
