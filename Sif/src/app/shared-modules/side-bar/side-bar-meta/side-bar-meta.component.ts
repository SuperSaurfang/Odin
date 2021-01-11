import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/core';

@Component({
  selector: 'app-side-bar-meta',
  templateUrl: './side-bar-meta.component.html',
  styleUrls: ['./side-bar-meta.component.scss']
})
export class SideBarMetaComponent implements OnInit {

  constructor(private userService: UserService) {

  }

  public isAuthor = false;
  public isAuthenticated = false;
  public user: User = undefined;

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (user) {
       this.user.updated_at = new Date(user.updated_at).toLocaleString();
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  login() {
    this.userService.loginWithRedirect();
  }

  isAdmin() {
    return this.userService.hasUserPermission('author');
  }
}
