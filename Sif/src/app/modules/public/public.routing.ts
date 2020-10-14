import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';


const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
    { path: 'blog/:title', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
    { path: 'page/:title', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
