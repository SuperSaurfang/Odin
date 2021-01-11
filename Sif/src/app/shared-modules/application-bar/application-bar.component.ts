import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';

import { faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { Rank } from 'src/app/core/enums/rank';
import { RouterState, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-bar',
  templateUrl: './application-bar.component.html',
  styleUrls: ['./application-bar.component.scss']
})
export class ApplicationBarComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  public home = faHome;
  public dashboard = faTachometerAlt;

  public isAdmin = false;
  public showStartpageLink = false;
  public showAdminpageLink = false;

  ngOnInit() {
    this.isAdmin = this.userService.hasUserPermission('author');
    if (this.route.url.includes('/dashboard')) {
      this.showStartpageLink = true;
    } else if (this.route.url.includes('/blog') || this.route.url.includes('/page')) {
      this.showAdminpageLink = true;
    }
  }

}
