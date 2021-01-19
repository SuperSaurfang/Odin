import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { timer } from 'rxjs';

import { UserService } from 'src/app/core/services';
import { Article, ChangeResponse } from 'src/app/core';
import { RestPageService } from '../../services';
@Component({
  selector: 'app-dashboard-pages-editor',
  templateUrl: './dashboard-pages-editor.component.html',
  styleUrls: ['./dashboard-pages-editor.component.scss']
})
export class DashboardPagesEditorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private restService: RestPageService) {}

  public article: Article = new Article();
  public editor = ClassicEditor;
  public isEdit = false;

  public iconSpinner = faSpinner;
  public iconCheck = faCheck;
  public iconTimes = faTimes;

  public isSaving = false;
  public isSaved = false;
  public isFailed = false;

  @ViewChild('pageEditor')
  public pageEditor: CKEditorComponent;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['title']) {
        this.restService.getPageByTitle(params['title']).subscribe(response => {
          this.article = response;
          if (this.article.articleText) {
            this.pageEditor.editorInstance.setData(this.article.articleText);
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
              hasCommentsEnabled: false,
              userId: user.sub
            };
          }
        });
      }
    });
  }

  public onUpdateArticleTitle() {
    this.saveArticle();
  }

  public onUpdateArticleText({editor}: ChangeEvent) {
    this.article.articleText = editor.getData();
    this.saveArticle();
  }

  public onUpdateStatus(event: string) {
    this.article.status = event;
    this.saveArticle();
  }

  public onUpdateAllowComment(event: boolean) {
    this.article.hasCommentsEnabled = event;
    this.saveArticle();
  }

  public onUpdateCreationDate(event: string) {
    this.article.creationDate = new Date(event);
    this.saveArticle();
  }

  private saveArticle() {
    this.isSaving = true;
    if (!this.isEdit && this.article.title) {
      this.restService.savePage(this.article).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.restService.getPageId(this.article.title).subscribe(id => {
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
    } else {
      this.updateArticle();
    }
  }

  private updateArticle() {
    this.restService.updatePage(this.article).subscribe(response => {
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

  private createHideTimer() {
    const hideTimer = timer(5000);
    const hideSubscribtion =  hideTimer.subscribe(() => {
      this.isSaved = false;
      this.isFailed = false;
      hideSubscribtion.unsubscribe();
    });
  }

}
