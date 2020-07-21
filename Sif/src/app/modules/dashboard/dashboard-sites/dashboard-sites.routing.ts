import { Routes, RouterModule } from '@angular/router';
import { DashboardSitesEditorComponent } from './dashboard-sites-editor/dashboard-sites-editor.component';
import { DashboardSitesListComponent } from './dashboard-sites-list/dashboard-sites-list.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: DashboardSitesListComponent },
    { path: 'edit', component: DashboardSitesEditorComponent },
    { path: 'edit/:title', component: DashboardSitesEditorComponent }
  ]},
];

export const DashboardSitesRoutes = RouterModule.forChild(routes);
