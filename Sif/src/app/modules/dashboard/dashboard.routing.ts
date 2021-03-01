import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardOverviewComponent },
      { path: 'posts', loadChildren: () => import('./dashboard-posts/dashboard-posts.module').then(m => m.DashboardPostsModule) },
      { path: 'pages', loadChildren: () => import('./dashboard-pages/dashboard-pages.module').then(m => m.DashboardPagesModule) },
      { path: 'navmenu', loadChildren: () => import('./dashboard-navmenu-editor/dashboard-navmenu-editor.module').then(m => m.DashboardNavmenuEditorModule)},
      { path: 'comments', loadChildren: () => import('./dashboard-comments/dashboard-comments.module').then(m => m.DashboardCommentsModule) }
    ]
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
