import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintboxComponent } from './hintbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [HintboxComponent],
  exports: [HintboxComponent]
})
export class HintboxModule { }
