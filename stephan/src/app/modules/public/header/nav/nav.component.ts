import { Component, OnInit } from '@angular/core';

interface NavEntry {
  routerlink: string | string[];
  displayText: string;
  isDropdown: boolean
  childs?: NavEntry[];
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isHover = false;
  public navEntries: NavEntry[] = [{
    routerlink: '/blog',
    isDropdown: false,
    displayText: 'Home',
  }, {
    routerlink: ['/site', 'Das bin ich'],
    isDropdown: true,
    displayText: 'Über mich',
    childs: [{
      displayText: 'Das mache ich!',
      isDropdown: false,
      routerlink: ['/site', 'Das mache ich']
    }]
  }, {
    routerlink: ['/site', 'Meine Projekte'],
    displayText: 'Meine Projekte',
    isDropdown: false
  }];
  constructor() { }

  ngOnInit() {
  }

  public onHover() {
    this.isHover = !this.isHover;
  }
}
