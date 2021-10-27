import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleEditorService } from 'src/app/core/baseClass';

@Injectable()
export class PageEditorService extends ArticleEditorService {
  
  public setArticleByTitle(title: string): void {
    throw new Error('Method not implemented.');
  }
  public createArticle(userId: string): void {
    throw new Error('Method not implemented.');
  }


  constructor() {
    super('page')
  }

  public save(): void {
    throw new Error('Method not implemented.');
  }
  public update(): void {
    throw new Error('Method not implemented.');
  }


  public addCategory(category: string): boolean {
    return false;
  }
  public removeCategory(category: string): boolean {
    return false;
  }
  public getCategories(): Observable<string[]> {
    const empty: string[] = [];
    return of(empty)
  }
}
