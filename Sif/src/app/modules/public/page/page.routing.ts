import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
];

export const PageRoutes = RouterModule.forChild(routes);
