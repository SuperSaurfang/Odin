import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlurEvent, ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { timer } from 'rxjs';

import { UserService } from 'src/app/core/services';
import { Article, ChangeResponse } from 'src/app/core';
import { RestPostsService } from '../../services';

@Component({
  selector: 'app-dashboard-post-editor',
  templateUrl: './dashboard-post-editor.component.html',
  styleUrls: ['./dashboard-post-editor.component.scss']
})
export class DashboardPostEditorComponent implements OnInit {
  public article: Article = new Article();
  public editor = ClassicEditor;
  public isEdit = false;

  public iconSpinner = faSpinner;
  public iconCheck = faCheck;
  public iconTimes = faTimes;

  public isSaving = false;
  public isSaved = false;
  public isFailed = false;

  @ViewChild('blogEditor')
  public blogEditor: CKEditorComponent;

  constructor(private route: ActivatedRoute,
    private restService: RestPostsService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['title']) {
        this.restService.getArticleByTitle(params['title']).subscribe(response => {
          this.article = response;
          if (this.article.articleText) {
            this.blogEditor.editorInstance.setData(this.article.articleText);
          }
          this.isEdit = true;
        });
      } else {
        this.userService.getUser().subscribe(user => {
          if (user) {
            this.article = {
              creationDate: new Date(),
              modificationDate: new Date(),
              status: 'draft',
              hasCommentsEnabled: true,
              hasDateAuthorEnabled: true,
              userId: user.sub
            };
          }
        });
      }
    });
  }

  private saveArticle() {
    if (!this.isEdit && this.article.title) {
      this.isSaving = true;
      this.restService.createBlog(this.article).subscribe(response => {

        switch (response.change) {
          case ChangeResponse.Change:
            this.restService.getBlogId(this.article.title).subscribe(id => {
              this.article.articleId = id;
              this.isEdit = true;
              this.isSaving = false;
              this.isSaved = true;
              this.createHideTimer();
            });
            break;
          case ChangeResponse.Error:
          case ChangeResponse.NoChange:
          default:
            this.isSaving = false;
            this.isFailed = true;
            this.createHideTimer();
            break;
        }
      });
    } else if (this.isEdit && (this.article.articleId !== null || this.article.articleId !== undefined)) {
      this.isSaving = true;
      this.updateArticle();
    }
  }

  private createHideTimer() {
    const hideTimer = timer(5000);
    const hideSubscribtion =  hideTimer.subscribe(() => {
      this.isSaved = false;
      this.isFailed = false;
      hideSubscribtion.unsubscribe();
    });
  }

  private updateArticle() {
    this.restService.updateBlog(this.article).subscribe(response => {
      this.createHideTimer();
      switch (response.change) {
        case ChangeResponse.Change:
          this.isSaving = false;
          this.isSaved = true;
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          this.isSaving = false;
          this.isFailed = true;
          break;
      }
    });
  }

  onChange( {editor}: ChangeEvent) {
    this.article.articleText = editor.getData();
  }

  public onUpdateArticleTitle() {
    this.saveArticle();
  }

  public onUpdateArticleText({editor}: BlurEvent) {
    this.article.articleText = editor.getData();
    this.saveArticle();
  }

  public onStatusUpdate(event: string) {
    this.article.status = event;
    this.saveArticle();
  }

  onCommentAllowUpdate(event: boolean) {
    this.article.hasCommentsEnabled = event;
    this.saveArticle();
  }

  onDisplayAuthorDateUpdate(event: boolean) {
    this.article.hasDateAuthorEnabled = event;
    this.saveArticle();
  }

  public parseUpdatedDate(event: string) {
    this.article.creationDate.setDate(new Date(event).getDate());
    this.article.creationDate.setMonth(new Date(event).getMonth());
    this.article.creationDate.setFullYear(new Date(event).getFullYear());
    this.saveArticle();
  }
}
