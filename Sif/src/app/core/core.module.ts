import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestService, UserService } from './services';
import { AuthGuard } from './guard';
import { InterceptorService } from './services/http/Interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { tokenGetter } from './const';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    AuthModule.forRoot({
      clientId: environment.auth0.clientId,
      audience: environment.auth0.audience,
      domain: environment.auth0.domain,
      redirectUri: environment.auth0.redirectUri,
      httpInterceptor: {
        allowedList: [
          `${environment.restApi}/dashboard/*`
        ]
      }
    })
  ],
  providers: [
    RestService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ]
})
export class CoreModule { }
