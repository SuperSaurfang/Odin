import { Component, OnInit } from '@angular/core';
import { Article, NavMenu } from 'src/app/core';
import { NavmenuService, RestNavmenuService } from '../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-navmenu-editor',
  templateUrl: './dashboard-navmenu-editor.component.html',
  styleUrls: ['./dashboard-navmenu-editor.component.scss']
})
export class DashboardNavmenuEditorComponent implements OnInit {

  constructor(private restNavmenuService: RestNavmenuService, private navMenuService: NavmenuService) {
  }

  public articles: Article[] = [];
  public navMenuList: NavMenu[] = [];

  public addPageForm = new FormGroup({
    selectedArticle: new FormControl('', {validators: Validators.required})
  });

  ngOnInit() {
    this.restNavmenuService.GetArticleList().subscribe(response => {
      this.articles = response;
    });
    this.navMenuService.getList().subscribe(list => {
      this.navMenuList = list;
    });
    this.navMenuService.getMessage().subscribe(message => {
      if (message) {
        console.log(message);
      }
    });
  }

  public saveMenu() {
    const navMenu = new NavMenu();
    navMenu.pageId = this.addPageForm.value['selectedArticle'];
    navMenu.navMenuOrder = this.navMenuList.length + 1;
    this.restNavmenuService.CreateNavMenu(navMenu).subscribe(response => {
      console.log(response);
      this.navMenuService.loadNavMenu();
    });
  }

}
