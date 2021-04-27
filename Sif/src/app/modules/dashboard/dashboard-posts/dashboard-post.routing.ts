import { Routes, RouterModule } from '@angular/router';
import { DashboardPostListComponent } from './dashboard-post-list/dashboard-post-list.component';
import { DashboardPostEditorComponent } from './dashboard-post-editor/dashboard-post-editor.component';
import { DashboardPostTagEditorComponent } from './dashboard-post-tag-editor/dashboard-post-tag-editor.component';
import { DashboardPostCategoryEditorComponent } from './dashboard-post-category-editor/dashboard-post-category-editor.component';

const routes: Routes = [
  { path: '',  children: [
    { path: '',  component: DashboardPostListComponent },
    { path: 'edit', component: DashboardPostEditorComponent },
    { path: 'edit/:title', component: DashboardPostEditorComponent },
    { path: 'tags', component: DashboardPostTagEditorComponent },
    { path: 'categories', component: DashboardPostCategoryEditorComponent}
  ]}
];

export const DashboardPostRoutes = RouterModule.forChild(routes);
