import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChangeResponse, MessageType, StatusResponseType, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { RestPostsService } from '../rest-posts/rest-posts.service';

@Injectable()
export class PostEditorService extends ArticleEditorService {

  private categoriesSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private restService: RestPostsService) {
    super();
  }

  public setArticleByTitle(title: string): void {
    this.restService.getArticleByTitle(title).subscribe(article => {
      this.article = article;
      this.articleSubject.next(this.article);
      this.setMode('edit');
    });
  }

  public createArticle(user: User): void {
    this.article = {
      creationDate: new Date(),
      modificationDate: new Date(),
      status: 'draft',
      hasCommentsEnabled: true,
      hasDateAuthorEnabled: true,
      userId: user.sub,
      categories: []
    };
    this.setMode('create');
  }

  public save(): void {
    if (this.mode === 'edit') {
      return;
    }

    this.restService.createBlog(this.article).subscribe(response => {
      if (response.responseType === StatusResponseType.Create && response.change === ChangeResponse.Change) {
        this.restService.getBlogId(this.article.title).subscribe(id => {
          this.article.articleId = id;
          this.setMode('edit');
          this.createMessage(MessageType.Ok, 'Artikel gespeichert.');
        });
      }
    });
  }

  public update(): void {
    if (this.mode === 'create') {
      return;
    }

    this.restService.updateBlog(this.article).subscribe(response => {
      if (response.responseType !== StatusResponseType.Update) {
        this.createMessage(MessageType.Error, `Fehler: ${response.message}`);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.createMessage(MessageType.Ok, 'Artikel aktualisiert.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(MessageType.Info, 'Artikel wurde nicht aktualisiert.');
          break;
        case ChangeResponse.Error:
          this.createMessage(MessageType.Error, 'Artikel konnte nicht aktualisert werden.');
          break;
      }
    });
  }

  public addCategory(category: string): boolean {
    if (!this.article.categories) {
      this.article.categories = [];
    }
    const result = this.article.categories.find(item => item === category);

    if (!result) {
      this.article.categories.push(category);
      this.categoriesSubject.next(this.article.categories);
      return true;
    }

    return false;
  }

  public removeCategory(category: string): boolean {
    const index = this.article.categories.findIndex(item => item === category);

    if (index >= 0) {
      this.article.categories.splice(index, 1);
      this.categoriesSubject.next(this.article.categories);
      return true;
    }

    return false;
  }

  public getCategories(): Observable<string[]> {
    return this.categoriesSubject;
  }
}
