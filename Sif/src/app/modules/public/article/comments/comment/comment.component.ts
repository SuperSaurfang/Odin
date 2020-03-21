import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from 'src/app/core/models';
import { faUser, faCalendar, faShare, faExclamation } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input()
  public articleId: number;

  @Input()
  public comment: Comment;

  @Input()
  public responseTo = -1;

  @Output()
  public showCommentForm = new EventEmitter<number>();

  @Output()
  public abortCommentForm = new EventEmitter();

  public user = faUser;
  public calendar = faCalendar;
  public share = faShare;
  public exclamation = faExclamation;

  ngOnInit() {
  }

  onShowCommentForm(commentId: number) {
    this.showCommentForm.emit(commentId);
  }

  onAbort() {
    this.abortCommentForm.emit();
  }

  onSaved(event: Comment) {
    if(!this.comment.answers) {
      this.comment.answers = [];
    }
    this.comment.answers.push(event);
    this.abortCommentForm.emit();
  }

}
