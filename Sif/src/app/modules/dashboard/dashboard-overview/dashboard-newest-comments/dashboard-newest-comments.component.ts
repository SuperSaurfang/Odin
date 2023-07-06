import { Component, OnInit } from '@angular/core';
import { RestCommentService } from '../../services';
import { Comment, CommentStatus } from '../../../../core/models';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-dashboard-newest-comments',
  templateUrl: './dashboard-newest-comments.component.html',
  styleUrls: ['./dashboard-newest-comments.component.scss']
})
export class DashboardNewestCommentsComponent implements OnInit {

  public comments: Comment[] = [];
  public statusmenuopen = -1;
  constructor(private commentService: RestCommentService) { }

  ngOnInit() {
    this.commentService.getCommentList().pipe(
      map(comments => {
        comments.forEach(comment => comment.creationDate = new Date(comment.creationDate))
        comments.sort(this.sortByDate)
        return comments;
      }),
      take(5)
    ).subscribe(comments => {
      this.comments = comments;
    })
  }

  openMenu(index: number) {
    if(this.statusmenuopen === index) {
      this.onClose();
      return;
    }
    this.statusmenuopen = index;
  }

  onClose(): void {
    this.statusmenuopen = -1;
  }

  updateStatus(index: number, status: CommentStatus): void {
    this.comments[index].status = status;
    this.onClose();
  }

  private sortByDate(a: Comment, b: Comment) {
    return b.creationDate.getTime() - a.creationDate.getTime();
  }

}
