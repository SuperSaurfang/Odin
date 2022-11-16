import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedDragDropListComponent } from './nested-drag-drop-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule
  ],
  declarations: [
    NestedDragDropListComponent,
  ],
  providers: [
  ],
  exports: [
    NestedDragDropListComponent
  ]
})
export class NestedDragDropListModule { }
