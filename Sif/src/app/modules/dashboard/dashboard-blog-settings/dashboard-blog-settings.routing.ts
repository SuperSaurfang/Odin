import { Routes, RouterModule } from '@angular/router';
import { DashboardBlogSettingsComponent } from './dashboard-blog-settings.component';

const routes: Routes = [
  { path: '', component: DashboardBlogSettingsComponent },
];

export const DashboardBlogSettingsRoutes = RouterModule.forChild(routes);
