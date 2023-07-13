import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleContentBoxComponent, ContentBoxBody, ContentBoxHeader } from './collapsible-content-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    TooltipModule
  ],
  declarations: [
    CollapsibleContentBoxComponent,
    
    ContentBoxBody,
    ContentBoxHeader
  ],
  exports: [
    CollapsibleContentBoxComponent,
    ContentBoxBody,
    ContentBoxHeader,
  ]
})
export class CollapsibleContentBoxModule { }
