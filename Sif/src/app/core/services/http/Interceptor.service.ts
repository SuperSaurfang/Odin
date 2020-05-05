import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs'
import { UserService } from '../user/user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if(this.userService.IsUserLoggedInValue()) {
      let user = this.userService.CurrentUserValue();
      let token = user.userToken;
      request = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`)
      })
    }
    return next.handle(request);
  }

}
