import { Routes, RouterModule } from '@angular/router';
import { DashboardNavmenuEditorComponent } from './dashboard-navmenu-editor.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: DashboardNavmenuEditorComponent}
  ]},
];

export const DashboardNavmenuEditorRoutes = RouterModule.forChild(routes);
