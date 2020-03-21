import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RestService } from 'src/app/core/services/rest/rest.service';
import {faUser, faCalendar, faShare, faExclamation} from '@fortawesome/free-solid-svg-icons'

import { Comment } from 'src/app/core/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {
  
  

  constructor(private restService: RestService) { }

  @Input()
  public articleId: number;

  public comments: Comment[] = [];
  public isResponseTo = false;
  public responseTo = -1
  public user = faUser;
  public calendar = faCalendar;
  public share = faShare;
  public exclamation = faExclamation;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.articleId && this.articleId > 0){
      this.restService.getComment(this.articleId).subscribe(comments => {
        this.comments = comments
      })
    }
  }

  onShowCommentForm(event: number) {
    this.isResponseTo = true;
    this.responseTo = event;
  }

  onAbort() {
    this.isResponseTo = false;
    this.responseTo = -1;
  }

  onSaved(event: Comment) {
    this.comments.push(event)
  }

}
