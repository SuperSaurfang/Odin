import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListActionBarComponent } from './list-action-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [ListActionBarComponent],
  exports: [ListActionBarComponent]
})
export class ListActionBarModule { }
