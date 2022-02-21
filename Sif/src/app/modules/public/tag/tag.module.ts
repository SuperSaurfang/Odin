import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { TagRoutes } from './tag.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleContentRendererModule } from '../shared-public-modules';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ArticleContentRendererModule,
    SharedModule,
    TagRoutes
  ],
  declarations: [TagComponent]
})
export class TagModule { }
