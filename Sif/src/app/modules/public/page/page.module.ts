import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutes } from './page.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleContentRendererModule } from '../shared-public-modules';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ArticleContentRendererModule,
    PageRoutes
  ],
  declarations: [
    PageComponent
  ]
})
export class PageModule { }
