import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Comment, User } from 'src/app/core';
import { UserService } from 'src/app/core/services';
import { CommentService } from '../services';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input()
  public articleId: number;

  @Input()
  public commentId: number = null;

  public isAuthenticated = false;
  public user: User = null;
  public infoIcon = faInfo;

  public comment = new FormControl('', Validators.required)

  constructor(
    private commentService: CommentService, 
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.user = user;
      } else {
        this.isAuthenticated = false;
        this.user = user;
      }
    });
  }

  public abortComment() {
    this.commentService.setAnswer(null);
  }

  public logout() {
    this.userService.logout();
  }

  public login() {
    this.userService.loginWithRedirect();
  }

  public saveComment() {
    if (this.comment.invalid) {
      return;
    }

    const comment: Comment = {
      articleId: this.articleId,
      answerOf: this.commentId,
      commentText: this.comment.value,
      creationDate: new Date(Date.now()),
      userId: this.isAuthenticated && this.user ? this.user.sub : 'guest'
    };
    this.commentService.saveComment(comment);
  }

}
