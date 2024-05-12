import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleTag, Category, ChangeResponse, Status, StatusResponseType, Tag, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { NotificationService } from '../notification/notification.service';
import { RestPostsService } from '../rest-posts/rest-posts.service';

@Injectable()
export class PostEditorService extends ArticleEditorService {

  private categoriesSubject: Subject<Category[]> = new Subject<Category[]>();
  private tagListSubject: Subject<Tag[]> = new Subject<Tag[]>();

  constructor(private restService: RestPostsService, notificationService: NotificationService) {
    super(notificationService);
  }

  public setArticleByTitle(title: string): void {
    this.restService.getArticleByTitle(title).subscribe(article => {
      this.updateArticleObject(article);
      this.categoriesSubject.next(this.article.categories);
      this.tagListSubject.next(this.article.tags);
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
      categories: [],
      tags: []
    };
    this.setMode('create');
  }

  public save(): void {
    if (this.mode === 'edit') {
      return;
    }

    this.restService.createBlog(this.article).subscribe(response => {
      // if the response type doesn't match the expected response type,
      // then the response could be manipulated or something similar
      if (response.responseType !== StatusResponseType.Create) {
        this.createMessage(Status.Warning, 'Der Inhalt des HTTP Body könnte manipuliert sein.');
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.updateArticleObject(response.model);
          this.setMode('edit');
          this.createMessage(Status.Ok, 'Der Artikel wurde erstellt.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(Status.Ok, 'Der Artikel konnte nicht erstellt werden.');
          break;
        case ChangeResponse.Error:
          this.createMessage(Status.Ok, 'Fehler beim erstellen des Artikels.');
          break;
      }
    });
  }

  public update(): void {
    if (this.mode === 'create') {
      return;
    }

    this.restService.updateBlog(this.article).subscribe(response => {
      if (response.responseType !== StatusResponseType.Update) {
        this.createMessage(Status.Warning, 'Der Inhalt des HTTP Body könnte manipuliert sein.');
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.updateArticleObject(response.model);
          this.createMessage(Status.Ok, 'Der Artikel wurde aktualisiert.');
          break;
        case ChangeResponse.NoChange:
          this.createMessage(Status.Info, 'Der Artikel wurde nicht aktualisiert.');
          break;
        case ChangeResponse.Error:
          this.createMessage(Status.Error, 'Der Artikel konnte nicht aktualisert werden.');
          break;
      }
    });
  }

  public addCategory(category: Category): boolean {
    if (!this.article.categories) {
      this.article.categories = [];
    }
    const result = this.article.categories.find(item => item.categoryId === category.categoryId);

    if (!result) {
      this.restService.addCategoryToArticle(this.article.articleId, category).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.categories.push(category);
            this.categoriesSubject.next(this.article.categories);
            this.createMessage(Status.Ok, 'Kategorie mit Artikel verknüpft.');
            break;
          case ChangeResponse.Error:
            this.createMessage(Status.Error, 'Beim verknüpfen einer Kategorie mit dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(Status.Info, 'Kategorie konnte nicht mit Artikel verknüpft werden.');
            break;
        }
      });
      return true;
    }

    return false;
  }

  public removeCategory(category: Category): boolean {
    const index = this.article.categories.findIndex(item => item.categoryId === category.categoryId);

    if (index >= 0) {
      this.restService.removeCategoryFromArticle(this.article.articleId, category).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.categories.splice(index, 1);
            this.categoriesSubject.next(this.article.categories);
            this.createMessage(Status.Ok, 'Kategorie von Artikel entfernt');
            break;
          case ChangeResponse.Error:
            this.createMessage(Status.Error, 'Beim entfernen der Kategorie von dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(Status.Info, 'Kategorie konnte nicht von Artikel entfernt werden.');
            break;
        }
      });
      return true;
    }
    return false;
  }

  public getCategories(): Observable<Category[]> {
    return this.categoriesSubject;
  }

  public addTag(tag: Tag): boolean {
    if (!this.article.tags) {
      this.article.tags = [];
    }
    const result = this.article.tags.find(item => item.tagId === tag.tagId);

    if (!result) {
      const articleTag = new ArticleTag(this.article, tag);
      this.restService.addTagToArticle(articleTag).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.tags.push(tag);
            this.tagListSubject.next(this.article.tags);
            this.createMessage(Status.Ok, 'Tag mit Artikel verknüpft.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(Status.Error, 'Beim verknüpfen eines Tags mit dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.Error:
            this.createMessage(Status.Info, 'Tag konnte nicht mit Artikel verknüpft werden.');
            break;
        }
      });
      return true;
    }

    return false;
  }

  public removeTag(tag: Tag): boolean {
    const index = this.article.tags.findIndex(item => item.tagId === tag.tagId);

    if (index >= 0) {
      const articleTag = new ArticleTag(this.article, tag);
      this.restService.removeTagFromArticle(articleTag).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.tags.splice(index, 1);
            this.tagListSubject.next(this.article.tags);
            this.createMessage(Status.Ok, 'Tag von Artikel entfernt');
            break;
          case ChangeResponse.Error:
            this.createMessage(Status.Error, 'Beim entfernen des Tags von dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(Status.Info, 'Tag konnte nicht von Artikel entfernt werden.');
            break;
        }
      });
      return true;
    }
    return false;
  }

  public getTagList(): Observable<Tag[]> {
    return this.tagListSubject;
  }
}
