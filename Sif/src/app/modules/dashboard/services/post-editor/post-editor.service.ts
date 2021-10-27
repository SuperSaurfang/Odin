import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { RestPostsService } from '../rest-posts/rest-posts.service';

@Injectable()
export class PostEditorService extends ArticleEditorService {
  
  
  private categoriesSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private restService: RestPostsService) { 
    super('blog')
  }

  public setArticleByTitle(title: string): void {
    this.restService.getArticleByTitle(title).subscribe(article => {
      this.article = article;
      this.articleSubject.next(this.article);
      this.setMode('edit');
    });
  }

  public createArticle(userId: string): void {
    this.article = {
      creationDate: new Date(),
      modificationDate: new Date(),
      status: 'draft',
      hasCommentsEnabled: true,
      hasDateAuthorEnabled: true,
      userId: userId,
      categories: []
    };
    this.setMode('create');
  }

  public save(): void {
    if(this.mode === 'edit') {
      return;
    }

    this.restService.createBlog(this.article).subscribe(response => {
      console.log(response);
    });
  }

  public update(): void {
    if(this.mode === 'create') {
      return;
    }

    this.restService.updateBlog(this.article).subscribe(response => {
      console.log(response);
    });
  }

  public addCategory(category: string): boolean {
    if(!this.article.categories) {
      this.article.categories = [];
    }
    const result = this.article.categories.find(item => item === category);

    if(!result) {
      this.article.categories.push(category);
      this.categoriesSubject.next(this.article.categories);
      return true;
    }

    return false;
  }

  public removeCategory(category: string): boolean {
    const index = this.article.categories.findIndex(item => item == category);

    if(index >= 0) {
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
