import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/core';
import { CommentService } from './services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input()
  public articleId: number;

  public isNotAnswer = true;

  public comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.articleId) {
      this.commentService.loadComments(this.articleId).subscribe(comments => {
        this.comments = comments;
      });
      this.commentService.isAnswerTo().subscribe(id => {
        if (id === null) {
          this.isNotAnswer = true;
        } else {
          this.isNotAnswer = false;
        }
      });
    }
  }

  ngOnInit() {
  }

}
