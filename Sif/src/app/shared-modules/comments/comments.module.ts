import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HintboxModule } from '../hintbox/hintbox.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HintboxModule
  ],
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentFormComponent
  ],
  providers: [
    CommentService
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentModule { }
