import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article.routing';
import { ArticleContentRendererModule } from '../shared-public-modules';



@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ArticleContentRendererModule
  ]
})
export class ArticleModule { }
