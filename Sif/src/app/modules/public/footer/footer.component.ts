import { Component, OnInit } from '@angular/core';
import { faAngular, faSass, faNodeJs, faFontAwesome, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import * as packageInfo from '../../../../../package.json';

const PACKAGE_INFO = packageInfo;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version = PACKAGE_INFO.version;
  public angular = faAngular;
  public sass = faSass;
  public nodeJs = faNodeJs;
  public fontAwesome = faFontAwesome;
  public html5 = faHtml5;
  public copyright = faCopyright;

  constructor() { }

  ngOnInit() {
  }

}
