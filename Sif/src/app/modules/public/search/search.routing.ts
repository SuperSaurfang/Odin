import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
];

export const SearchRoutes = RouterModule.forChild(routes);
