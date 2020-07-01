import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faAngleDown, faAngleUp, faCircle } from '@fortawesome/free-solid-svg-icons';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';

import { RestService } from 'src/app/core/services';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-dashboard-post-editor',
  templateUrl: './dashboard-post-editor.component.html',
  styleUrls: ['./dashboard-post-editor.component.scss']
})
export class DashboardPostEditorComponent implements OnInit {
  public article: Article = new Article();
  public editor = ClassicEditor;
  public isEdit = false;

  public iconStatus = faAngleDown
  public isStatusSettingOpen = false;

  @ViewChild('blogEditor')
  public blogEditor: CKEditorComponent;

  constructor(private route: ActivatedRoute, private restService: RestService) 
  { 
    this.article = {
      creationDate: new Date(),
      modificationDate: new Date(),
      status: 'draft',
      hasCommentsEnabled: true,
      hasDateAuthorEnabled: true
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

  saveArticle() {
    console.log(this.article);
  }

  onChange( {editor}: ChangeEvent) 
  {
    this.article.articleText = editor.getData();
  }

  public openStatusSettings() {
    this.isStatusSettingOpen = !this.isStatusSettingOpen;
    if(this.isStatusSettingOpen) {
      this.iconStatus = faAngleUp;
    } else {
      this.iconStatus = faAngleDown;
    }
  }

  public parseUpdatedDate(event: string){
    this.article.creationDate.setDate(new Date(event).getDate());
    this.article.creationDate.setMonth(new Date(event).getMonth());
    this.article.creationDate.setFullYear(new Date(event).getFullYear());
  } 
}
