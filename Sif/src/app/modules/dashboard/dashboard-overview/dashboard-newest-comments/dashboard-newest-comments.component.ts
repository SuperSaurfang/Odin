import { Component, OnInit } from '@angular/core';
import { RestCommentService } from '../../services';
import { ChangeResponse, Comment, CommentStatus, Status } from '../../../../core/models';
import { map, take } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-newest-comments',
  templateUrl: './dashboard-newest-comments.component.html',
  styleUrls: ['./dashboard-newest-comments.component.scss']
})
export class DashboardNewestCommentsComponent implements OnInit {

  public comments: Comment[] = [];
  public statusmenuopen = -1;
  constructor(private commentService: RestCommentService, private notificationService: NotificationService) { }

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
    this.commentService.putComment(this.comments[index]).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.pushNotification('Der Status wurde aktualisiert.', Status.Ok);
          break;
        case ChangeResponse.Error:
          this.pushNotification('Fehler beim aktualisieren des Status.', Status.Error);
          break;
        case ChangeResponse.NoChange:
          this.pushNotification('Der Status konnte nicht aktualisiert werden.', Status.Info);
          break;
      }
    });
  }

  private sortByDate(a: Comment, b: Comment) {
    return b.creationDate.getTime() - a.creationDate.getTime();
  }

  private pushNotification(message: string, status: Status) {
    this.notificationService.pushNotification({
      date: new Date(Date.now()),
      message: message,
      status: status
    });
  }

}
