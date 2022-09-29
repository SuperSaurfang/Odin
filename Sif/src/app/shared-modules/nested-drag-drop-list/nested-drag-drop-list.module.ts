import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedDragDropListComponent } from './nested-drag-drop-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragAndDropManagerRootDirective, DragDropManagerDirective } from './directives/DragDropManager.directive';
import { DragDropManagerService } from './services/DragDropManager.service';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule
  ],
  declarations: [
    NestedDragDropListComponent,
    DragDropManagerDirective,
    DragAndDropManagerRootDirective
  ],
  providers: [
    DragDropManagerService
  ],
  exports: [
    NestedDragDropListComponent
  ]
})
export class NestedDragDropListModule { }
