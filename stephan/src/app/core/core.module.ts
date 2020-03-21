import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestService, UserService } from './services'
import { AuthGuard } from './guard';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    RestService,
    UserService,
    AuthGuard
  ]
})
export class CoreModule { }
