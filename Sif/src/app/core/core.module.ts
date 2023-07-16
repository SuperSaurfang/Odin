import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestService, UserService, WindowsScrollService } from './services';
import { AuthGuard } from './guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { tokenGetter } from './const';
import { SearchService } from './services/search/search.service';


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
      domain: environment.auth0.domain,
      authorizationParams: {
        audience: environment.auth0.audience,
        redirect_uri: environment.auth0.redirectUri
      },
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
    SearchService,
    WindowsScrollService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  exports: [
  ]
})
export class CoreModule { }
