import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core';
import { ArticleEditorService } from 'src/app/core/baseClass';
import { CategoryService } from '../../../services/category/category.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss']
})
export class CategorySettingComponent implements OnInit, OnDestroy {

  public removeIcon = faTimes;
  public categories: Category[] = [];
  public selectedCategory: string;

  public contectedCategories: Category[] = [];

  // easier to manage the subscriptions as list
  private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService,
    private articleEditor: ArticleEditorService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscribtion => {
      subscribtion.unsubscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    }));

    this.subscriptions.push(this.articleEditor.getCategories().subscribe(categories => {
      this.contectedCategories = categories;
    }));
  }


  public onChange(event: any): void {
    const category = this.categories.find(item => item.name === this.selectedCategory);
    if (category === undefined) {
      this.createNewCategory();
    } else {
      this.addCategory(category);
    }
  }

  public remove(category: Category): void {
    this.articleEditor.removeCategory(category);
  }

  private createNewCategory(): void {
    let category = new Category();
    category.name = this.selectedCategory;
    this.categoryService.createCategory(category).subscribe(result => {
      if (result) {
        category = this.categories.find(item => item.name === this.selectedCategory);
        this.addCategory(category);
      }
    });
  }

  private addCategory(category: Category) {
    if (this.articleEditor.addCategory(category)) {
      this.selectedCategory = undefined;
    }
  }
}
