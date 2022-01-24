import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    parentId: ['']
  });

  public currentEditing = DEFAULT_EDITING_INDEX;

  // holds the restore item, that will be reassign if editing was abort by user
  private restoreValue: string;
  private subscription: Subscription;

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder) { }

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

  public getParentNameById(id: number): string {
    if (id === undefined) {
      return;
    }

    // if the id was changed by the selection it will be a string?!
    if (typeof id === 'string') {
      // tslint:disable-next-line: radix
      id = parseInt(id);
    }
    const result = this.categoryList.find(item => item.categoryId === id);
    if (result === undefined) {
      return '';
    }

    return result.name;
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
