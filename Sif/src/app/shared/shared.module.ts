import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { KeepHtmlPipe, NewlinePipe } from 'src/app/core/pipes';

import { SideBarModule } from '../shared-modules/side-bar/side-bar.module';
import { ApplicationBarModule} from '../shared-modules/application-bar/application-bar.module';
import { CheckboxModule } from '../shared-modules/checkbox/checkbox.module';
import { ToggleSwitchModule } from '../shared-modules/toggle-switch/toggle-switch.module';
import { MenuModule } from '../shared-modules/menu/menu.module';
import { CommentModule } from '../shared-modules/comments/comments.module';
import { HintboxModule } from '../shared-modules/hintbox/hintbox.module';
import { CollapsibleContentBoxModule } from '../shared-modules/collapsible-content-box/collapsible-content-box.module';


@NgModule({
  declarations: [
    NewlinePipe,
    KeepHtmlPipe
  ],
  imports: [
    CommonModule,
  ], exports: [
    NewlinePipe,
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
    CollapsibleContentBoxModule
  ]
})
export class SharedModule { }
