import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { BaseNode, NestedDragDropDatasource } from './nested-drag-drop-datasource';
import { DragDropManagerService } from './services/drag-drop-manager.service';
import { faSave, faRotateBack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nested-drag-drop-list',
  templateUrl: './nested-drag-drop-list.component.html',
  styleUrls: ['./nested-drag-drop-list.component.scss']
})
export class NestedDragDropListComponent<T extends BaseNode<T>> implements OnInit, OnChanges {

  private restoreValue: string = '';

  public saveIcon = faSave;
  public resetIcon = faRotateBack

  @Input()
  public dataSource: NestedDragDropDatasource<T>[] = [];

  @Input()
  public content: TemplateRef<T>;

  @Input()
  public previewContent: TemplateRef<T>;

  @Output()
  public onSaveNestedList: EventEmitter<T[]> = new EventEmitter<T[]>()

  constructor(private dragDropManager: DragDropManagerService) {
    this.dragDropManager.init();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.restoreValue = JSON.stringify(changes.dataSource.currentValue);
  }

  ngOnInit() {
  }

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

    this.updateData(this.dataSource);
  }

  private updateData(dataSource: NestedDragDropDatasource<T>[]) {
    dataSource.forEach((element) => {
      if(!element.data.children) {
        element.data.children = [];
      }

      if (element.children.length !== element.data.children.length) {
        element.data.children = [];
        element.children.forEach((elementChildren) => {
          element.data.children.push(elementChildren.data);
        });
      }

      if(element.children.length > 0) {
        this.updateData(element.children);
      }
    });
  }

  public saveNestedList() {
    const data: T[] = [];
    this.dataSource.forEach((element) => {
      data.push(element.data);
    });

    this.onSaveNestedList.emit(data);
  }

  public resetNestedList() {
    this.dataSource = JSON.parse(this.restoreValue);
  }

}
