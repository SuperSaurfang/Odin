import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideBarComponent } from './side-bar.component';
import { SideBarSearchComponent } from './side-bar-search/side-bar-search.component';
import { SideBarMetaComponent } from './side-bar-meta/side-bar-meta.component';

@NgModule({
  declarations: [
    SideBarComponent,
    SideBarMetaComponent,
    SideBarSearchComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideBarComponent
  ]
})
export class SideBarModule { }
