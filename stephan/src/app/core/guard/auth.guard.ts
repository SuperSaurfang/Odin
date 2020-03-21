import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.CurrentUserValue();
    if(currentUser) {
      if(route.data.roles && route.data.roles.indexOf(currentUser.userRank) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}