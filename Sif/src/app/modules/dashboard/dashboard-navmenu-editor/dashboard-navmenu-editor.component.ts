import { Component, OnInit } from '@angular/core';
import { Article, Category, ChangeResponse, NavMenu, Status, StatusResponseType } from 'src/app/core';
import { NavmenuService, RestNavmenuService } from '../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createNavMenuLink, MenuType } from './navmenu-factory';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-navmenu-editor',
  templateUrl: './dashboard-navmenu-editor.component.html',
  styleUrls: ['./dashboard-navmenu-editor.component.scss']
})
export class DashboardNavmenuEditorComponent implements OnInit {

  constructor(private restNavmenuService: RestNavmenuService,
    private navMenuService: NavmenuService,
    private notificationService: NotificationService) {
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
    this.restNavmenuService.getArticleList().subscribe(articles => {
      this.articles = articles;
    });
    this.restNavmenuService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    });
    this.navMenuService.getNavMenuList().subscribe(navMenuList => {
      this.navMenuList = navMenuList;
    });
  }

  public saveMenu(type: MenuType) {
    let navMenu = new NavMenu();
    navMenu.navMenuOrder = this.navMenuService.getNextOrderValue();
    navMenu.displayText = this.getFormValue(type);
    navMenu = createNavMenuLink(type, navMenu);
    this.restNavmenuService.createNavMenu(navMenu).subscribe(response => {
      const notification = {
        date: new Date(Date.now()),
        message: 'Neues Navigationmenü Element erstellt.',
        status: Status.Ok,
      };

      if (response.change === ChangeResponse.Change && response.responseType === StatusResponseType.Create) {
        this.navMenuService.loadNavMenu();
        this.resetAll();
        this.notificationService.pushNotification(notification);
      } else if (response.change === ChangeResponse.NoChange) {
        notification.message = 'Es kein neues Navigationmenü Element erstellt.';
        notification.status = Status.Info;
        this.notificationService.pushNotification(notification);
      } /* ChangeResponse is Error */ else {
        notification.message = 'Fehler beim erstellen eines neuen Navigationmenü Elementes.';
        notification.status = Status.Error;
        this.notificationService.pushNotification(notification);
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
