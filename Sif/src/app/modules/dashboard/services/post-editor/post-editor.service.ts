import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleCategory, Category, ChangeResponse, MessageType, StatusResponseType, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { RestPostsService } from '../rest-posts/rest-posts.service';

@Injectable()
export class PostEditorService extends ArticleEditorService {

  private categoriesSubject: Subject<Category[]> = new Subject<Category[]>();

  constructor(private restService: RestPostsService) {
    super();
  }

  public setArticleByTitle(title: string): void {
    this.restService.getArticleByTitle(title).subscribe(article => {
      this.article = article;
      this.articleSubject.next(this.article);
      this.categoriesSubject.next(this.article.categories);
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

  public addCategory(category: Category): boolean {
    if (!this.article.categories) {
      this.article.categories = [];
    }
    const result = this.article.categories.find(item => item.categoryId === category.categoryId);

    if (!result) {
      const articleCategory = new ArticleCategory(this.article, category);
      this.restService.addCategoryToArticle(articleCategory).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.categories.push(category);
            this.categoriesSubject.next(this.article.categories);
            this.createMessage(MessageType.Ok, 'Kategory mit Artikel verknüpft.');
            break;
          case ChangeResponse.Error:
            this.createMessage(MessageType.Error, 'Beim verknüpfen einer Kategorie mit dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(MessageType.Info, 'Kategorie konnte nicht mit Artikel verknüpft werden.');
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
      const articleCategory = new ArticleCategory(this.article, category);
      this.restService.removeCategoryFromArticle(articleCategory).subscribe(response => {
        switch (response.change) {
          case ChangeResponse.Change:
            this.article.categories.splice(index, 1);
            this.categoriesSubject.next(this.article.categories);
            this.createMessage(MessageType.Ok, 'Kategory von Artikel entfernt');
            break;
          case ChangeResponse.Error:
            this.createMessage(MessageType.Error, 'Beim entfernen der Kategorie von dem Artikel trat ein Fehler auf.');
            break;
          case ChangeResponse.NoChange:
            this.createMessage(MessageType.Info, 'Kategorie konnte nicht von Artikel entfernt werden.');
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
}
