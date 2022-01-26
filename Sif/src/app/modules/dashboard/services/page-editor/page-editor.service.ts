import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, Tag, User } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';

@Injectable()
export class PageEditorService extends ArticleEditorService {

  constructor() {
    super();
  }

  public save(): void {
    throw new Error('Method not implemented.');
  }
  public update(): void {
    throw new Error('Method not implemented.');
  }

  public setArticleByTitle(title: string): void {
    throw new Error('Method not implemented.');
  }
  public createArticle(user: User): void {
    throw new Error('Method not implemented.');
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
