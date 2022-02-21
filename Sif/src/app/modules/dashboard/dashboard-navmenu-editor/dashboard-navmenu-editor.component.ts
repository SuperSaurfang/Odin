import { Component, OnInit } from '@angular/core';
import { Article, Category, ChangeResponse, NavMenu, StatusResponseType } from 'src/app/core';
import { NavmenuService, RestNavmenuService } from '../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createNavMenuLink, MenuType } from './navmenu-factory';

@Component({
  selector: 'app-dashboard-navmenu-editor',
  templateUrl: './dashboard-navmenu-editor.component.html',
  styleUrls: ['./dashboard-navmenu-editor.component.scss']
})
export class DashboardNavmenuEditorComponent implements OnInit {

  constructor(private restNavmenuService: RestNavmenuService, private navMenuService: NavmenuService) {
  }

  public articles: Article[] = [];
  public categories: Category[] = [];
  public navMenuList: NavMenu[] = [];

  public addPageForm = new FormGroup({
    selectedArticle: new FormControl('', { validators: Validators.required })
  });

  public addCategoryForm = new FormGroup({
    selectedCategory: new FormControl('', { validators: Validators.required })
  });

  public addLabelForm = new FormGroup({
    label: new FormControl('', { validators: Validators.required })
  });

  ngOnInit() {
    this.restNavmenuService.getArticleList().subscribe(response => {
      this.articles = response;
    });
    this.restNavmenuService.getCategoryList().subscribe(response => {
      this.categories = response;
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

  public saveMenu(type: MenuType) {
    let navMenu = new NavMenu();
    navMenu.navMenuOrder = this.navMenuService.getNextOrderValue();
    navMenu.displayText = this.getFormValue(type);
    navMenu = createNavMenuLink(type, navMenu);
    this.restNavmenuService.createNavMenu(navMenu).subscribe(response => {
      if (response.change === ChangeResponse.Change && response.responseType === StatusResponseType.Create) {
        this.navMenuService.loadNavMenu();
        this.resetAll();
      }
    });
  }

  private getFormValue(type: MenuType) {
    switch (type) {
      case 'page':
        return this.addPageForm.value['selectedArticle'];
      case 'category':
        return this.addCategoryForm.value['selectedCategory'];
      case 'label':
        return this.addLabelForm.value['label'];
    }
  }

  private resetAll() {
    this.addCategoryForm.reset();
    this.addLabelForm.reset();
    this.addPageForm.reset();
  }

}
