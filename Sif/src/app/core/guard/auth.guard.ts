import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasPermission = this.userService.hasUserPermission(route.data.roles);
    if (hasPermission) {
      return true;
    } else {
      this.userService.isAuthenticated().subscribe(isAuthenticated => {
        if (!isAuthenticated) {
          this.userService.loginWithRedirect();
        }
      });
      this.router.navigate(['/blog']);
      return false;
    }
  }
}
