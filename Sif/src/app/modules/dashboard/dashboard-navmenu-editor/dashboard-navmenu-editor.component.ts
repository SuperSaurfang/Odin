import { Component, OnInit } from '@angular/core';
import { Article, NavMenu } from 'src/app/core';
import { RestNavmenuService } from '../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard-navmenu-editor',
  templateUrl: './dashboard-navmenu-editor.component.html',
  styleUrls: ['./dashboard-navmenu-editor.component.scss']
})
export class DashboardNavmenuEditorComponent implements OnInit {

  constructor(private restNavmenuService: RestNavmenuService, private restService: RestService) {
  }

  public articles: Article[] = [];
  public navMenuList: NavMenu[] = [];
  public draggingNavmenu: NavMenu;

  public addPageForm = new FormGroup({
    selectedArticle: new FormControl('', {validators: Validators.required})
  });

  ngOnInit() {
    this.restNavmenuService.GetArticleList().subscribe(response => {
      this.articles = response;
    });
    this.loadNavMenu();
  }

  private loadNavMenu() {
    this.restService.getNavMenu().subscribe(response => {
      this.navMenuList = response;
    });
  }

  public saveMenu() {
    const navMenu = new NavMenu();
    navMenu.pageId = this.addPageForm.value['selectedArticle'];
    this.restNavmenuService.CreateNavMenu(navMenu).subscribe(response => {
      console.log(response);
      this.loadNavMenu();
    });
  }

  public onDragStart(event: DragEvent, item: NavMenu) {
    event.dataTransfer.effectAllowed = 'move';
    this.draggingNavmenu = item;
  }

  public onDragEnd(event: DragEvent, item: NavMenu) {
    this.draggingNavmenu = undefined;
  }

  public onDragOver(event: DragEvent, item: NavMenu) {
    if (this.draggingNavmenu) {
      event.preventDefault();
    }
  }

  public onDrop(event: DragEvent) {
    const index = this.navMenuList.indexOf(this.draggingNavmenu);
    this.navMenuList.splice(index, 1);
    this.navMenuList.push(this.draggingNavmenu);
    this.draggingNavmenu = undefined;
  }

}
