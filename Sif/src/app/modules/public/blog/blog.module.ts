import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

import { BlogRoutingModule } from './blog.routing';
import { ArticleContentRendererModule } from '../shared-public-modules';



@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FontAwesomeModule,
    ArticleContentRendererModule,
    SharedModule
  ]
})
export class BlogModule {}
