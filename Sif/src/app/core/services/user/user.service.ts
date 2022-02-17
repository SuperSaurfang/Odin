import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';
import { ACCESS_TOKEN_KEY } from '../../const';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private helper: JwtHelperService) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.getAccessTokenSilently().subscribe(token => {
          if (token) {
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
          }
        });
      } else {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
          }
    });
  }

  private currentUser: BehaviorSubject<User>;
  private isUserLoggedIn: BehaviorSubject<boolean>;

  public loginWithRedirect() {
    this.authService.loginWithRedirect();
  }

  public logout() {
    this.authService.logout();
  }

  public getUser(): Observable<User> {
    return this.authService.user$;
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated$;
  }

  public isLoading() {
    return this.authService.isLoading$;
  }

  public CurrentUser(): Observable<User> {
    return this.currentUser;
  }
  public CurrentUserValue(): User {
    return this.currentUser.value;
  }

  public IsUserLoggedInValue(): boolean {
    return this.isUserLoggedIn.value;
  }

  public hasUserPermission(permission: string | string[]): boolean {
    const decodedToken = this.helper.decodeToken();
    // if the helper does not return a token abort check and return false
    if (!decodedToken) {
      return false;
    }

    const permissions: string[] = decodedToken['permissions'];

    // check if the parameter is an array
    if (Array.isArray(permission)) {
      let isInclude = false;
      for (let index = 0; index < permissions.length; index++) {
        isInclude = permission.includes(permissions[index]);
        if (isInclude) {
          break;
        }
      }
      return isInclude;
    } else {
      return permissions.includes(permission);
    }
  }
}
