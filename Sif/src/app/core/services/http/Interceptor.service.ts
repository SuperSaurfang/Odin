import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs'
import { UserService } from '../user/user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    return next.handle(request);
  }

}
