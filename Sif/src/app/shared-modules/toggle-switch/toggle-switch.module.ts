import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ToggleSwitchComponent } from './toggle-switch.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    ToggleSwitchComponent
  ],
  exports: [
    ToggleSwitchComponent
  ]
})
export class ToggleSwitchModule { }
