import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { NewlinePipe } from 'src/app/core/pipes'

import { SideBarModule } from '../shared-modules/side-bar/side-bar.module';


@NgModule({
  declarations: [
    NewlinePipe
  ],
  imports: [
    CommonModule,
  ], exports: [
    NewlinePipe,
    ReactiveFormsModule,
    SideBarModule
  ]
})
export class SharedModule { }
