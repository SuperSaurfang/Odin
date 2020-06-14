import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { CheckboxComponent } from './checkbox.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    CheckboxComponent
  ],
  exports:[
    CheckboxComponent
  ]
})
export class CheckboxModule { }
