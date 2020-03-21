import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';
import { Rank } from 'src/app/core/enums/rank';

@Component({
  selector: 'app-side-bar-meta',
  templateUrl: './side-bar-meta.component.html',
  styleUrls: ['./side-bar-meta.component.scss']
})
export class SideBarMetaComponent implements OnInit {

  constructor(private userService: UserService) { 

  }

  public isLoggedIn = false;
  public isAdmin = false;

  ngOnInit() {
    this.userService.IsUserLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if(isLoggedIn) {
        let rank = this.userService.CurrentUserValue().userRank;
        if(Rank.Admin.toString() === rank) {
          this.isAdmin = true;
        }
      } else {
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.userService.logout();
  }

}
