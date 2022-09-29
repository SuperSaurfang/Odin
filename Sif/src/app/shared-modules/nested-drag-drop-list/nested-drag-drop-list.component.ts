import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BaseNode, NestedDragDropDatasource } from './nested-drag-drop-datasource';

@Component({
  selector: 'app-nested-drag-drop-list',
  templateUrl: './nested-drag-drop-list.component.html',
  styleUrls: ['./nested-drag-drop-list.component.scss']
})
export class NestedDragDropListComponent<T extends BaseNode<T>> implements OnInit {

  @Input()
  public dataSource: NestedDragDropDatasource<T>[] = [];

  @Input()
  public content: TemplateRef<T>;

  @Input()
  public previewContent: TemplateRef<T>;

  constructor() {}

  ngOnInit() {}

  public onDragDrop(event: CdkDragDrop<NestedDragDropDatasource<T>[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
