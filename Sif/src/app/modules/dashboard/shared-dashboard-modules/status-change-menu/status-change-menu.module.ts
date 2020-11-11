import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusChangeMenuComponent } from './status-change-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    StatusChangeMenuComponent
  ],
  exports: [
    StatusChangeMenuComponent
  ]
})
export class StatusChangeMenuModule { }
