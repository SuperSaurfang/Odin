import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleComponent } from './article.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsFormComponent } from './comments/comments-form/comments-form.component'
import { CommentComponent } from './comments/comment/comment.component'
import { ArticleRoutingModule } from './article.routing';



@NgModule({
  declarations: [
    ArticleComponent,
    CommentsComponent,
    CommentsFormComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class ArticleModule { }
