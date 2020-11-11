import { Routes, RouterModule } from '@angular/router';
import { DashboardPagesEditorComponent } from './dashboard-pages-editor/dashboard-pages-editor.component';
import { DashboardPagesListComponent } from './dashboard-pages-list/dashboard-pages-list.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: DashboardPagesListComponent },
    { path: 'edit', component: DashboardPagesEditorComponent },
    { path: 'edit/:title', component: DashboardPagesEditorComponent }
  ]},
];

export const DashboardPagesRoutes = RouterModule.forChild(routes);
