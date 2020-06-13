import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { NewlinePipe } from 'src/app/core/pipes'

import { SideBarModule } from '../shared-modules/side-bar/side-bar.module';
import { ApplicationBarModule} from '../shared-modules/application-bar/application-bar.module';
import { CheckboxModule } from '../shared-modules/checkbox/checkbox.module';


@NgModule({
  declarations: [
    NewlinePipe
  ],
  imports: [
    CommonModule,
  ], exports: [
    NewlinePipe,
    ReactiveFormsModule,
    SideBarModule,
    ApplicationBarModule,
    CheckboxModule
  ]
})
export class SharedModule { }
