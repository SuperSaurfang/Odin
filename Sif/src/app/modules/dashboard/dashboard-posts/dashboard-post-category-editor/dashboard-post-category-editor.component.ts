import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core';
import { CategoryService } from '../../services/category/category.service';

const DEFAULT_EDITING_INDEX = -1;
@Component({
  selector: 'app-dashboard-post-category-editor',
  templateUrl: './dashboard-post-category-editor.component.html',
  styleUrls: ['./dashboard-post-category-editor.component.scss']
})
export class DashboardPostCategoryEditorComponent implements OnInit, OnDestroy {

  public editIcon = faEdit;
  public trashIcon = faTrash;
  public saveIcon = faSave;
  public abortIcon = faTimes;

  public categoryList: Category[] = [];

  public createCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    parent: new FormControl<Category | null>(null)
  });

  public currentEditing = DEFAULT_EDITING_INDEX;

  // holds the restore item, that will be reassign if editing was abort by user
  private restoreValue: string;
  private subscription: Subscription;

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder) { }

  public get selectParentCategoryList(): Category[] {
    const categories = [...this.categoryList];
    if (this.currentEditing > DEFAULT_EDITING_INDEX) {
      // remove the current item, that is edited by the user
      categories.splice(this.currentEditing, 1);

      // remove all the items that cannot set as the parent, to prevent circle references e.g.:
      // category 'b' has 'a' as the parent, so category 'a' cannot have 'b' as the parent
      // this also affects to grandparents of the categories
      const currentItem = this.categoryList[this.currentEditing];
      const results = this.getInvalidCategories(currentItem);
      results.forEach(result => {
        const index = categories.findIndex(item => item.categoryId === result.categoryId);
        categories.splice(index, 1);
      });
    }
    return categories;
  }

  private getInvalidCategories(currentItem: Category) {
    const results: Category[] = [];
    this.categoryList.forEach(item => {
      if (item.parent?.categoryId === currentItem.categoryId) {
        results.push(item);
        results.push(...this.getInvalidCategories(item));
      }
    });
    return results;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.categoryService.getCategoryList().subscribe(categoryList => {
      this.categoryList = categoryList;
    });
  }

  public createCategory() {
    const formValue = this.createCategoryForm.value as Category;
    this.createCategoryForm.reset();
    this.categoryService.createCategory(formValue);
  }

  public deleteCategory(index: number) {
    const item = this.categoryList[index];
    if (item === undefined) {
      return;
    }

    this.categoryService.deleteCategory(item.categoryId);
    this.reset();
  }

  public updateCategory(index: number) {
    const item = this.categoryList[index];
    if (item === undefined) {
      return;
    }

    this.categoryService.updateCategory(item);
    this.reset();
  }

  public setCurrentEditing(index: number): void {
    // prevent editing an other item before, the current wasn't saved
    if (this.currentEditing !== DEFAULT_EDITING_INDEX) {
      return;
    }

    // create a restore value to keep the data
    this.restoreValue = JSON.stringify(this.categoryList[index]);
    this.currentEditing = index;
  }

  public clearCurrentEditing(): void {
    if (this.restoreValue === '' || this.currentEditing === DEFAULT_EDITING_INDEX) {
      return;
    }

    // set the restore value to the current editing item, when the user don't want to save the changes
    this.categoryList[this.currentEditing] = JSON.parse(this.restoreValue);
    this.reset();
  }

  private reset(): void {
    this.currentEditing = DEFAULT_EDITING_INDEX;
    this.restoreValue = '';
  }

}
