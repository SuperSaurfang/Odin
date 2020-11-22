import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { NavMenu } from 'src/app/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isHover = false;
  public navMenu: NavMenu[] = [];
  constructor(private restService: RestService) {

  }

  ngOnInit() {
    this.restService.getNavMenu().subscribe(response => {
      this.navMenu = response;
    });
  }

  public onHover() {
    this.isHover = !this.isHover;
  }
}
