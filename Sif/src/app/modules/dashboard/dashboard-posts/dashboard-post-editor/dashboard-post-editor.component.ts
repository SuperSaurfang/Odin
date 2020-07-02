import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';

import { RestService, UserService } from 'src/app/core/services';
import { Article, EChangeResponse } from 'src/app/core';

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
  public isSaving = false;
  public isSaved = false;

  @ViewChild('blogEditor')
  public blogEditor: CKEditorComponent;

  constructor(private route: ActivatedRoute, 
    private restService: RestService, 
    private userService: UserService) 
  {
    this.article = {
      creationDate: new Date(),
      modificationDate: new Date(),
      status: 'draft',
      hasCommentsEnabled: true,
      hasDateAuthorEnabled: true,
      userId: this.userService.CurrentUserValue().userId
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['title']) {
        this.restService.getArticleByTitle(params['title']).subscribe(response => {
          this.article = response;
          this.blogEditor.editorInstance.setData(this.article.articleText);
          this.isEdit = true;
        })
      }
    })
  }

  private saveArticle() {
    this.isSaving = true;
    console.log(this.article);
    if(!this.isEdit && this.article.title) {
      this.restService.createBlog(this.article).subscribe(response => {
        switch (response.ChangeResponse) {
          case EChangeResponse.Change:
            this.restService.getBlogId(this.article.title).subscribe(response => {
              this.article.articleId = response;
              this.isEdit = true;
              this.isSaving = false;
              this.isSaved = true;
            })
          case EChangeResponse.Error:
          case EChangeResponse.NoChange:
          default:
            break;
        }
      })
    } else {
      this.updateArticle();
    }
  }

  private updateArticle() {
    this.restService.updateBlog(this.article).subscribe(response => {
      console.log(response);
      this.isSaving = false;
      this.isSaved = true;
    })
  }

  onChange( {editor}: ChangeEvent) {
    this.article.articleText = editor.getData();
  }

  public onUpdateArticleTitle() {
    this.saveArticle();
  }

  public onUpdateArticleText({editor}: ChangeEvent) {
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

  public parseUpdatedDate(event: string){
    this.article.creationDate.setDate(new Date(event).getDate());
    this.article.creationDate.setMonth(new Date(event).getMonth());
    this.article.creationDate.setFullYear(new Date(event).getFullYear());
    this.saveArticle();
  } 
}
