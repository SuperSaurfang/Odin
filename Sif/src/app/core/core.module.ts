import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestService, UserService } from './services';
import { AuthGuard } from './guard';
import { InterceptorService } from './services/http/Interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    RestService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
