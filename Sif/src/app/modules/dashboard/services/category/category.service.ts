import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/core';
import { RestCategoryService } from '../rest-category/rest-category.service';

@Injectable()
export class CategoryService {


  private categoryList = new Subject<Category[]>();
  constructor(private restService: RestCategoryService) { }


  public getCategoryList(): Observable<Category[]> {
    this.restService.getCategoryList().subscribe(response => {
      this.categoryList.next(response);
    });
    return this.categoryList;
  }

}
