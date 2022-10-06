import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedDragDropListComponent } from './nested-drag-drop-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragAndDropManagerRootDirective, DragDropManagerDirective } from './directives/DragDropManager.directive';
import { DragDropManagerService } from './services/drag-drop-manager.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule
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
