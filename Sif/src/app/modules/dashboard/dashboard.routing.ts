import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardOverviewComponent },
      { path: 'posts', loadChildren: () => import('./dashboard-posts/dashboard-posts.module').then(m => m.DashboardPostsModule) }
    ]
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
