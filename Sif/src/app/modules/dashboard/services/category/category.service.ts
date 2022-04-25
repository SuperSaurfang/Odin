import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category, ChangeResponse } from 'src/app/core';
import { RestCategoryService } from '../rest-category/rest-category.service';

@Injectable()
export class CategoryService {

  private categories: Category[] = [];
  private categoryList = new Subject<Category[]>();
  constructor(private restService: RestCategoryService) { }


  public getCategoryList(): Observable<Category[]> {
    this.restService.getCategoryList().subscribe(response => {
      this.categories = response;
      this.categoryList.next(response);
    });
    return this.categoryList;
  }

  public updateCategory(category: Category) {
    this.restService.updateCategory(category).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.categories = this.update(this.categories, response.model);
          this.next(this.categories);
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
        default:
          break;
      }
    });
  }

  public deleteCategory(id: number) {
    this.restService.deleteCategory(id).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.categories = response.model;
          this.next(this.categories);
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          break;
      }
    });
  }

  public createCategory(category: Category): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    this.restService.createCategory(category).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.categories.push(response.model);
          this.next(this.categories);
          resultSubject.next(true);
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          resultSubject.next(false);
          break;
      }
    });
    return resultSubject;
  }

  private update(categories: Category[], category: Category): Category[] {
    categories.map(item => {
      if (item.categoryId === category.categoryId) {
        item.articleCount = item.articleCount;
        item.description = category.description;
        item.name = category.name;
        item.parent = category.parent;
      }
    });
    return categories;
  }

  private next(categories: Category[]) {
    this.categoryList.next(categories);
  }

}
