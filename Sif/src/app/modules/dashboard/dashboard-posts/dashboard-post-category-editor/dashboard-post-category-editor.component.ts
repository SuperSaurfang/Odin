import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/core';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-dashboard-post-category-editor',
  templateUrl: './dashboard-post-category-editor.component.html',
  styleUrls: ['./dashboard-post-category-editor.component.scss']
})
export class DashboardPostCategoryEditorComponent implements OnInit {

  public editIcon = faEdit;
  public trashIcon = faTrash;

  public categoryList: Category[] = [];

  public createCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    parentId: ['']
  });

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categoryList => {
      this.categoryList = categoryList;
    });
  }

  createCategory() {
    console.log(this.createCategoryForm.value);
  }

  public getParentNameById(id: number): string {
    const result = this.categoryList.find(item => item.categoryId === id);
    if (result === undefined) {
      return '';
    }

    return result.name;
  }

}
