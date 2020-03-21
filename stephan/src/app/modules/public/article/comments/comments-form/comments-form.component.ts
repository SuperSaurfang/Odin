import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/core/services/rest/rest.service';
import { Comment } from 'src/app/core/models'

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

  @Input()
  public articleId: number;

  @Input()
  public commentId: number;

  @Output()
  public abort = new EventEmitter();

  @Output()
  public saved = new EventEmitter<Comment>();

  public isUser = false;
  public commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
    author: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private formBuilder: FormBuilder, private restService: RestService) { }

  get author() {
    return this.commentForm.get('author')
  }

  get email() {
    return this.commentForm.get('email')
  }

  get comment() {
    return this.commentForm.get('comment')
  }

  ngOnInit() {
  }

  public saveComment() {
    if(this.commentForm.invalid) {
      this.author.markAsTouched();
      this.comment.markAsTouched();
      this.email.markAsTouched();
    } else {
      const data: Comment = {
        articleId: this.articleId,
        commentText: this.comment.value,
        creationDate: new Date(Date.now()),
        answerOf: this.commentId,
        userMail: this.email.value,
        userName: this.author.value,
        userRank: 'guest',
      }
      this.restService.postComment(data).subscribe(response => {
        response.creationDate = new Date(response.creationDate);
        this.saved.emit(response);
      })
    }
  }

  public abortComment() {
    this.commentForm.reset()
    this.abort.emit();
  }
}
