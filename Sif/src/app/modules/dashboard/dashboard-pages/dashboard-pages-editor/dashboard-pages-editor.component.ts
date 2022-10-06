import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/app/core/ckeditor';
import { BlurEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/services';
import { ArticleEditorService } from 'src/app/core';
import { ImageUploadAdapter } from 'src/app/core/adapters/upload-adapter';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';


@Component({
  selector: 'app-dashboard-pages-editor',
  templateUrl: './dashboard-pages-editor.component.html',
  styleUrls: ['./dashboard-pages-editor.component.scss']
})
export class DashboardPagesEditorComponent implements OnInit, OnDestroy {
  public title = '';
  public editor = ClassicEditor;

  public isSaved = false;

  @ViewChild('pageEditor')
  public pageEditor: CKEditorComponent;

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private articleEditor: ArticleEditorService,
    private imageUploadService: ImageUploadService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.articleEditor.getArticle().subscribe(article => {
      this.title = article.title;

      if (article.articleText) {
        this.pageEditor.editorInstance.setData(article.articleText);
      }
    }));

    this.activatedRoute.params.subscribe(params => {
      if (params['title']) {
        this.articleEditor.setArticleByTitle(params['title']);
      } else {
        this.userService.getUser().subscribe(user => {
          if (user) {
            this.articleEditor.createArticle(user);
          }
        });
      }
    });
  }

  public onUpdateArticleTitle() {
    this.articleEditor.updateTitle((this.title));
  }

  public onUpdateArticleText({ editor }: BlurEvent) {
    this.articleEditor.updateText(editor.getData());
  }

  public onReady(editor: ClassicEditor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new ImageUploadAdapter(loader, this.imageUploadService);
    };
  }
}
