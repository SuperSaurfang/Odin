import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { ArticleContentRendererModule } from '../shared-public-modules';
import { SideBarModule } from 'src/app/shared-modules/side-bar/side-bar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ArticleContentRendererModule,
    SideBarModule,
    FontAwesomeModule,
    CategoryRoutes
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
