import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models';
import { CommentService } from '../services';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  public comment: Comment;

  public isAnswerTo = false;

  constructor(private commentService: CommentService) { }


  ngOnInit() {
    this.commentService.isAnswerTo().subscribe(id => {
      if (id === this.comment?.commentId) {
        this.isAnswerTo = true;
      } else {
        this.isAnswerTo = false;
      }
    });
  }

  public onShowCommentForm() {
    this.commentService.setAnswer(this.comment.commentId);
  }

  public get userName() {
    if (!this.comment.user) {
      return "Gast"
    }
    return this.comment.user.nickname;
  }

  public get isUser(): boolean {
    return this.comment.userId !== 'guest'
  }

}
