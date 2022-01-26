import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleContentRendererComponent } from './article-content-renderer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [
    ArticleContentRendererComponent
  ],
  exports: [
    ArticleContentRendererComponent
  ]
})
export class ArticleContentRendererModule { }
