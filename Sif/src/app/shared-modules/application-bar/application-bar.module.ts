import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationBarComponent } from './application-bar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [
    ApplicationBarComponent
  ],
  exports: [
    ApplicationBarComponent
  ]
})
export class ApplicationBarModule { }
