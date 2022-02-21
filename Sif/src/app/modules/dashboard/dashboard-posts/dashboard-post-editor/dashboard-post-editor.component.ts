import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/app/core/ckeditor';
import { BlurEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';

import { UserService } from 'src/app/core/services';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { Subscription } from 'rxjs';
import { Message, MessageType } from 'src/app/core/models';
import { HintType } from 'src/app/shared-modules/hintbox/hintbox.component';
import { ImageUploadAdapter } from 'src/app/core/adapters/upload-adapter';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';

@Component({
  selector: 'app-dashboard-post-editor',
  templateUrl: './dashboard-post-editor.component.html',
  styleUrls: ['./dashboard-post-editor.component.scss']
})
export class DashboardPostEditorComponent implements OnInit, OnDestroy {
  public title = '';
  public editor = ClassicEditor;

  public message: Message;
  public hintType: HintType = 'info';

  public isSaved = false;

  @ViewChild('blogEditor')
  public blogEditor: CKEditorComponent;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleEditorService,
    private imageUploadService: ImageUploadService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }


  ngOnInit() {
    this.subscriptions.push(this.articleService.getArticle().subscribe(article => {
      this.title = article.title;

      if (article.articleText) {
        this.blogEditor.editorInstance.setData(article.articleText);
      }
    }));

    this.subscriptions.push(this.articleService.getMessage().subscribe(message => {
      setTimeout(() => {
        this.isSaved = false;
      }, 2500);
      switch (message.messageType) {
        case MessageType.Ok:
          this.hintType = 'ok';
          break;
        case MessageType.Error:
          this.hintType = 'danger';
          break;
        case MessageType.Info:
          this.hintType = 'info';
          break;
        case MessageType.Warning:
          this.hintType = 'warn';
          break;
      }
      this.message = message;
      this.isSaved = true;
    }));

    this.route.params.subscribe(params => {
      if (params['title']) {
        this.articleService.setArticleByTitle(params['title']);
      } else {
        this.userService.getUser().subscribe(user => {
          if (user) {
            this.articleService.createArticle(user);
          }
        });
      }
    });
  }

  public onUpdateArticleTitle() {
    this.articleService.updateTitle(this.title);
  }

  public onUpdateArticleText({editor}: BlurEvent) {
    this.articleService.updateText(editor.getData());
  }

  public onReady(editor: ClassicEditor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new ImageUploadAdapter(loader, this.imageUploadService);
    };
  }
}
