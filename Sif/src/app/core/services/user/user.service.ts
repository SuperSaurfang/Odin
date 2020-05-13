import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { User } from '../../models';
import { of, Observable, BehaviorSubject } from 'rxjs';

const KEY = 'currentUser';

@Injectable()
export class UserService {

  constructor(private restService: RestService) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(KEY)))

    if(this.currentUser.value !== null) {
      this.isUserLoggedIn = new BehaviorSubject<boolean>(true);
    } else {
      this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  private currentUser: BehaviorSubject<User>;
  private isUserLoggedIn: BehaviorSubject<boolean>;

  public login(user: User) {
    this.restService.postLogin(user).subscribe(response => {
      if(!response.userId) {
        localStorage.removeItem(KEY);
        this.currentUser.next(null);
        this.isUserLoggedIn.next(false);
        return
      }
      localStorage.setItem(KEY, JSON.stringify(response));
      this.currentUser.next(response);
      this.isUserLoggedIn.next(true);
    })
  }

  public logout() {
    localStorage.removeItem(KEY);
    this.currentUser.next(null);
    this.isUserLoggedIn.next(false)
  }

  public CurrentUser(): Observable<User> {
    return this.currentUser;
  }
  public CurrentUserValue(): User {
    return this.currentUser.value;
  }

  public IsUserLoggedIn(): Observable<boolean> {
    return this.isUserLoggedIn;
  }

  public IsUserLoggedInValue(): boolean {
    return this.isUserLoggedIn.value;
  }
}
