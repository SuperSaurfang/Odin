import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { ArticleContentRendererModule } from '../shared-public-modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ArticleContentRendererModule,
    SharedModule,
    FontAwesomeModule,
    CategoryRoutes
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
