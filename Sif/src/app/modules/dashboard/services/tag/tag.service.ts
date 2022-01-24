import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChangeResponse, Tag } from 'src/app/core';
import { RestTagService } from '../rest-tag/rest-tag.service';

@Injectable()
export class TagService {

  private tagList: Tag[] = [];
  private tagListSubject = new Subject<Tag[]>();
  constructor(private restService: RestTagService) { }

  public getTagList(): Observable<Tag[]> {
    this.restService.getTagList().subscribe(tagList => {
      this.tagList = tagList;
      this.next(this.tagList);
    });
    return this.tagListSubject;
  }

  public updateTag(tag: Tag) {
    this.restService.updateTag(tag).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.tagList = this.update(this.tagList, tag);
          this.next(this.tagList);
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
        default:
          break;
      }
    });
  }
  public deleteTag(id: number) {
    this.restService.deleteTag(id).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.tagList = this.removeById(this.tagList, id);
          this.next(this.tagList);
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
        default:
          break;
      }
    });
  }
  public createTag(tag: Tag) {
    this.restService.createTag(tag).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.restService.getTagList().subscribe(tagList => {
            this.tagList = tagList;
            this.next(this.tagList);
          });
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
        default:
          break;
      }
    });
  }


  private update(tagList: Tag[], tag: Tag): Tag[] {
    tagList.map(item => {
      if (item.tagId = tag.tagId) {
        item.Name = tag.Name;
        item.Description = tag.Description;
        item.ArticleCount = tag.ArticleCount;
      }
    });
    return tagList;
  }

  private removeById(tagList: Tag[], id: number): Tag[] {
    const index = tagList.findIndex(item => item.tagId === id);
    if (index >= 0) {
      tagList.slice(index, 1);
    }
    return tagList;
  }

  private next(tagList: Tag[]) {
    this.tagListSubject.next(tagList);
  }
}
