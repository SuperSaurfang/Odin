import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { NewlinePipe } from 'src/app/core/pipes'

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu'

import { SideBarModule } from '../shared-modules/side-bar/side-bar.module';
import { ApplicationBarModule} from '../shared-modules/application-bar/application-bar.module';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'


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
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
  ]
})
export class SharedModule { }
