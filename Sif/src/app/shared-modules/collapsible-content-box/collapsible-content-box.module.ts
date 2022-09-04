import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleContentBoxComponent, ContentBoxBody, ContentBoxHeader } from './collapsible-content-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
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
