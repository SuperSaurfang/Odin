import { Component, OnDestroy, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ArticleEditorService, Tag } from 'src/app/core';
import { TagService } from '../../../services';

@Component({
  selector: 'app-tag-setting',
  templateUrl: './tag-setting.component.html',
  styleUrls: ['./tag-setting.component.scss']
})
export class TagSettingComponent implements OnInit, OnDestroy {

  public removeIcon = faTimes;
  public selectedTag: string;
  public tagList: Tag[] = [];
  public connectedTagList: Tag[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private tagService: TagService,
    private articleEditor: ArticleEditorService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.tagService.getTagList().subscribe(tagList => {
      this.tagList = tagList;
    }));

    this.subscriptions.push(this.articleEditor.getTagList().subscribe(tagList => {
      this.connectedTagList = tagList;
    }));
  }

  public onChange(event: any): void {
    const tag = this.tagList.find(item => item.name === this.selectedTag);
    if (tag === undefined) {
      this.createNewCategory();
    } else {
      this.addTag(tag);
    }
  }

  public remove(tag: Tag): void {
    this.articleEditor.removeTag(tag);
  }

  private createNewCategory(): void {
    let tag = new Tag();
    tag.name = this.selectedTag;
    this.tagService.createTag(tag).subscribe(result => {
      if (result) {
        tag = this.tagList.find(item => item.name === this.selectedTag);
        this.addTag(tag);
      }
    });
  }

  private addTag(tag: Tag) {
    if (this.articleEditor.addTag(tag)) {
      this.selectedTag = undefined;
    }
  }
}
