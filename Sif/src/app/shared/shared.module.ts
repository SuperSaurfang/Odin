import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { KeepHtmlPipe } from 'src/app/core/pipes';

import { SideBarModule } from '../shared-modules/side-bar/side-bar.module';
import { ApplicationBarModule} from '../shared-modules/application-bar/application-bar.module';
import { CheckboxModule } from '../shared-modules/checkbox/checkbox.module';
import { ToggleSwitchModule } from '../shared-modules/toggle-switch/toggle-switch.module';
import { MenuModule } from '../shared-modules/menu/menu.module';
import { CommentModule } from '../shared-modules/comments/comments.module';
import { HintboxModule } from '../shared-modules/hintbox/hintbox.module';
import { CollapsibleContentBoxModule } from '../shared-modules/collapsible-content-box/collapsible-content-box.module';
import { PaginatorModule } from '../shared-modules/paginator';
import { NestedDragDropListModule } from '../shared-modules/nested-drag-drop-list/nested-drag-drop-list.module';
import { TooltipModule } from '../shared-modules/tooltip/tooltip.module';


@NgModule({
  declarations: [
    KeepHtmlPipe
  ],
  imports: [
    CommonModule,
  ], exports: [
    KeepHtmlPipe,
    ReactiveFormsModule,
    SideBarModule,
    ApplicationBarModule,
    CheckboxModule,
    ToggleSwitchModule,
    MenuModule,
    DragDropModule,
    CommentModule,
    HintboxModule,
    CollapsibleContentBoxModule,
    PaginatorModule,
    NestedDragDropListModule,
    TooltipModule
  ]
})
export class SharedModule { }
