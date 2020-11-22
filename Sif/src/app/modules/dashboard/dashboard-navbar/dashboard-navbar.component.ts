import { Component, OnInit } from '@angular/core';

import { faTachometerAlt, faEdit, faHome, faSitemap, faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  constructor() { }

  public tachometer = faTachometerAlt;
  public edit = faEdit;
  public home = faHome;
  public menu = faSitemap;
  public page = faCopy;

  ngOnInit() {
  }

}
