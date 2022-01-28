import { Routes, RouterModule } from '@angular/router';
import { TagComponent } from './tag.component';

const routes: Routes = [
  { path: '', component: TagComponent },
];

export const TagRoutes = RouterModule.forChild(routes);
