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
    console.log(category);
    this.restService.updateCategory(category).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.categories = this.update(this.categories, category);
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
          this.categories = this.removeById(this.categories, id);
          this.next(this.categories);
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          break;
      }
    });
  }

  public createCategory(category: Category) {
    this.restService.createCategory(category).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.restService.getCategoryList().subscribe(response => {
            this.categories = response;
            this.categoryList.next(response);
          });
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          break;
      }
    });
  }

  private update(categories: Category[], category: Category): Category[] {
    categories.map(item => {
      if (item.categoryId === category.categoryId) {
        item.articleCount = item.articleCount;
        item.description = category.description;
        item.name = category.name;
        item.parentId = category.parentId;
      }
    });
    return categories;
  }

  private removeById(categories: Category[], id: number): Category[] {
    const index = categories.findIndex(item => item.categoryId === id);
    if (index >= 0) {
      categories.splice(index, 1);
    }
    return categories;
  }

  private add(categories: Category[], category: Category): Category[] {
    categories.push(category);
    return categories;
  }

  private next(categories: Category[]) {
    this.categoryList.next(categories);
  }

}
