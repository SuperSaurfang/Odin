import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, ChangeResponse, Status, StatusResponseType, Tag, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { NotificationService } from '../notification/notification.service';
import { RestPageService } from '../rest-page/rest-page.service';

@Injectable()
export class PageEditorService extends ArticleEditorService {

  constructor(private restService: RestPageService, notficationService: NotificationService) {
    super(notficationService);
  }

  public setArticleByTitle(title: string): void {
    this.restService.getPageByTitle(title).subscribe(article => {
      this.updateArticleObject(article);
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
      // if the response type doesn't match the expected response type,
      // then the response could be manipulated or something similar
      if (response.responseType !== StatusResponseType.Create) {
        this.createMessage(Status.Info, 'Der Inhalt des HTTP Body könnte manipuliert sein.');
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.updateArticleObject(response.model);
          this.setMode('edit');
          this.createMessage(Status.Ok, 'Eine neue Seite wurde erstellt.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(Status.Info, 'Eine neue Seite konnte nicht erstellt werden');
          break;
        case ChangeResponse.Error:
          this.createMessage(Status.Error, 'Fehler beim erstellen der Seite.');
          break;
      }
    });
  }

  public update(): void {
    if (this.mode === 'create') {
      return;
    }

    this.restService.updatePage(this.article).subscribe(response => {
      if (response.responseType !== StatusResponseType.Update) {
        this.createMessage(Status.Warning, 'Der Inhalt des HTTP Body könnte manipuliert sein.');
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.updateArticleObject(response.model);
          this.createMessage(Status.Ok, 'Die Seite wurde aktualisiert.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(Status.Info, 'Die Seite wurde nicht aktualisiert.');
          break;
        case ChangeResponse.Error:
          this.createMessage(Status.Error, 'Fehler beim aktualisieren der Seite.');
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
