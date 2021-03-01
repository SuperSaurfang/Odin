import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faCalendar, faExclamation, faShare, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
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

  public user = faUser;
  public calendar = faCalendar;
  public share = faShare;
  public exclamation = faExclamation;
  public circle = faCircle;

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

}
