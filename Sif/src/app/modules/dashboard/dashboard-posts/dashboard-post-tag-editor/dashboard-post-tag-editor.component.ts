import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/core';
import { TagService } from '../../services';



const DEFAULT_EDITING_INDEX = -1;
@Component({
  selector: 'app-dashboard-post-tag-editor',
  templateUrl: './dashboard-post-tag-editor.component.html',
  styleUrls: ['./dashboard-post-tag-editor.component.scss']
})
export class DashboardPostTagEditorComponent implements OnInit, OnDestroy {

  public tagList: Tag[] = [];
  public currentEditing = DEFAULT_EDITING_INDEX;

  public createTagForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  
  private restoreValue: string;
  private subscription: Subscription;

  constructor(private tagService: TagService, private formBuilder: FormBuilder) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.tagService.getTagList().subscribe(tagList => {
      this.tagList = tagList;
    });
  }

  public createTag() {
    const tag = this.createTagForm.value as Tag;
    this.createTagForm.reset();
    this.tagService.createTag(tag);
  }

  public setCurrentEditing(index: number) {
    if (this.currentEditing !== DEFAULT_EDITING_INDEX) {
      return;
    }

    this.restoreValue = JSON.stringify(this.tagList[index]);
    this.currentEditing = index;
  }

  public deleteTag(index: number) {
    const item = this.tagList[index];
    if (item === undefined) {
      return;
    }

    this.tagService.deleteTag(item.tagId);
    this.reset();
  }

  public updateTag(index: number) {
    const item = this.tagList[index];
    if (item === undefined) {
      return;
    }

    this.tagService.updateTag(item);
    this.reset();
  }

  public clearCurrentEditing(): void {
    if (this.restoreValue === '' || this.currentEditing === DEFAULT_EDITING_INDEX) {
      return;
    }

    // set the restore value to the current editing item, when the user don't want to save the changes
    this.tagList[this.currentEditing] = JSON.parse(this.restoreValue);
    this.reset();
  }

  private reset(): void {
    this.currentEditing = DEFAULT_EDITING_INDEX;
    this.restoreValue = '';
  }

}
