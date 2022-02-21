import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ChangeResponse, MessageType, StatusResponseType, Tag, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { RestPageService } from '../rest-page/rest-page.service';

@Injectable()
export class PageEditorService extends ArticleEditorService {

  constructor(private restService: RestPageService) {
    super();
  }

  public setArticleByTitle(title: string): void {
    this.restService.getPageByTitle(title).subscribe(article => {
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
    };
    this.setMode('create');
  }

  public save(): void {
    if (this.mode === 'edit') {
      return;
    }

    this.restService.savePage(this.article).subscribe(response => {
      if (response.responseType === StatusResponseType.Create && response.change === ChangeResponse.Change) {
        this.restService.getPageId(this.article.title).subscribe(id => {
          this.article.articleId = id;
          this.setMode('edit');
          this.createMessage(MessageType.Ok, 'Seite erstellt');
        });
      }
    });
  }
  public update(): void {
    if (this.mode === 'create') {
      return;
    }

    this.restService.updatePage(this.article).subscribe(response => {
      if (response.responseType !== StatusResponseType.Update) {
        this.createMessage(MessageType.Error, `Fehler: ${response.message}`);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.createMessage(MessageType.Ok, 'Seite aktualisiert.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(MessageType.Info, 'Seite wurde nicht aktualisiert.');
          break;
        case ChangeResponse.Error:
          this.createMessage(MessageType.Error, 'Seite konnte nicht aktualisert werden.');
          break;
      }
    });
  }

  public addCategory(category: Category): boolean {
    return false;
  }
  public removeCategory(category: Category): boolean {
    return false;
  }
  public getCategories(): Observable<Category[]> {
    const empty: Category[] = [];
    return of(empty);
  }

  public addTag(tag: Tag): boolean {
    return false;
  }
  public removeTag(tag: Tag): boolean {
    return false;
  }
  public getTagList(): Observable<Tag[]> {
    const empty: Tag[] = [];
    return of(empty);
  }
}
