import { Component, OnInit } from '@angular/core';
import { RestCommentService } from '../../services';
import { Comment } from 'src/app/core';

@Component({
  selector: 'app-dashboard-comments-list',
  templateUrl: './dashboard-comments-list.component.html',
  styleUrls: ['./dashboard-comments-list.component.scss']
})
export class DashboardCommentsListComponent implements OnInit {

  public comments: Comment[] = [];

  public isIndeterminate = false;
  public isAllSelected = false;
  public selectedComments: boolean[] = [];

  constructor(private commentService: RestCommentService) { }

  ngOnInit() {
    this.commentService.getCommentList().subscribe(response => {
      this.comments = response;

      this.selectedComments = [];
      this.comments.forEach(comment => {
        this.selectedComments.push(false);
      });
    });
  }

  public setSelectedComment(index: number) {
    this.selectedComments[index] = !this.selectedComments[index];
    const result = this.selectedComments.filter(b => b === true);
    if (result.length === this.selectedComments.length) {
      this.isAllSelected = true;
      this.isIndeterminate = false;
    } else if (result.length === 0) {
      this.isAllSelected = false;
      this.isIndeterminate = false;
    } else {
      this.isAllSelected = false;
      this.isIndeterminate = true;
    }
  }

  public setAllSelected(event: boolean) {
    this.isAllSelected = event;
    this.isIndeterminate = false;
    for (let index = 0; index < this.selectedComments.length; index++) {
      if (this.isAllSelected) {
        this.selectedComments[index] = true;
      } else {
        this.selectedComments[index] = false;
      }
    }
  }

}
