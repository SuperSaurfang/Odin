import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';


const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
    { path: 'blog/:title', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
    { path: 'page/:title', loadChildren: () => import('./page/page.module').then(m => m.PageModule) },
    { path: 'category/:category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
    { path: 'tag/:tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule) },
    { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
