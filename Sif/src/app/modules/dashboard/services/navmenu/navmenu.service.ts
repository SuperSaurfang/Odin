import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeResponse, NavMenu } from 'src/app/core';
import { RestNavmenuService } from '../rest-navmenu/rest-navmenu.service';

@Injectable()
export class NavmenuService {

  private navMenuList: NavMenu[] = [];
  private originalList: NavMenu[] = [];
  private navMenuListSubject: BehaviorSubject<NavMenu[]> = new BehaviorSubject(this.navMenuList);
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private restService: RestNavmenuService) {
    this.loadNavMenu();
  }

  public loadNavMenu() {
    this.restService.getFlatList().subscribe(response => {
      this.navMenuList = response;
      this.originalList = response.map(item => Object.assign(new NavMenu(), item));
      this.navMenuListSubject.next(response);
    });
  }

  /**
   * Save the changes of the nav menu entry
   * @param navMenu nav menu entry to save
   */
  public saveNavMenuEntry(navMenu: NavMenu) {
    this.restService.updateNavMenu(navMenu).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          const index = this.navMenuList.findIndex(item => item.navMenuId === navMenu.navMenuId);
          this.navMenuList[index] = navMenu;
          this.originalList[index] = { ...navMenu };
          this.navMenuListSubject.next(this.navMenuList);
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
          break;
        default:
          break;
      }
      // this.messageSubject.next(response.message);
    });
  }

  public deleteNavMenuEnty(navMenuId: number) {
    this.restService.deleteNavMenu(navMenuId).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          const index = this.navMenuList.findIndex(item => item.navMenuId === navMenuId);
          this.navMenuList.splice(index, 1);
          this.originalList = this.navMenuList.map(item => Object.assign(new NavMenu(), item));
          this.navMenuListSubject.next(this.navMenuList);
          break;
        case ChangeResponse.NoChange:
        case ChangeResponse.Error:
        default:
          break;
      }
    });
  }

  public getMessage(): Observable<string> {
    return this.messageSubject;
  }

  public getNextOrderValue(): number {
    let currentMax = 0;
    currentMax = Math.max.apply(currentMax, this.navMenuList.map(value => value.navMenuOrder));
    return ++currentMax;
  }

  /**
   * Get an observable list of the first level nav menu entries
   */
  public getList(): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => list.filter(item => item.parentId === 0 || item.parentId === undefined))
    );
  }

  /**
   * Get an observable list of the children nav menu entries
   * from the parent id
   * @param parentId the id of the nav menu entry to find the children
   */
  public getChildren(parentId: number): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => list.filter(item => item.parentId === parentId))
    );
  }

  /**
   * Get an observable list for parent selection control
   * @param navMenuId the id of the nav menu entry
   */
  public getParentSelectionList(navMenuId: number): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => this.resolveParentSelectionList(navMenuId, list))
    );
  }

  /**
   * Set the parent of ths nav menu entry
   * @param navMenuId the id of the nav menu entry that become the parent
   * @param parentId the id of the children nav menu entry
   */
  public setParent(navMenuId: number, parentId: number) {
    const index = this.navMenuList.findIndex(item => item.navMenuId === navMenuId);
    this.navMenuList[index].parentId = parentId;
    this.navMenuListSubject.next(this.navMenuList);
  }

  /**
   * Remove the parent id
   * @param navMenuId the of the nav menu entry where to remove the parent id
   */
  public removeParent(navMenuId: number) {
    const index = this.navMenuList.findIndex(item => item.navMenuId === navMenuId);
    this.navMenuList[index].parentId = undefined;
    this.navMenuListSubject.next(this.navMenuList);
  }

  /**
   * reset the changes that the user makes within the nav menu structure
   * @param navMenuId the nav menu id where to reset the changes
   */
  public abortEdit(navMenuId = -1) {
    if (navMenuId === -1) {
      this.navMenuList = this.originalList.map(item => Object.assign(new NavMenu(), item));
      this.navMenuListSubject.next(this.navMenuList);
    } else {
      const index = this.originalList.findIndex(item => item.navMenuId === navMenuId);
      this.navMenuList[index] = {...this.originalList[index]};
      this.navMenuListSubject.next(this.navMenuList);
    }
  }

  private resolveParentSelectionList(navMenuId: number, list: NavMenu[]): NavMenu[]  {
    // remove nav menu entry with the same id, cause it should not be possible to set nav menu entry as parent of itself
    let navMenuList = list.filter(item => item.navMenuId !== navMenuId);

    // get children of nav menu entry, cause it should not be possible to set a children as a parent
    const children = this.resolveChildren(navMenuId, this.navMenuList);
    children.forEach(child => {
      navMenuList = navMenuList.filter(item => item.navMenuId !== child.navMenuId);
    });

    return navMenuList;
  }

  private resolveChildren(navMenuId: number, list: NavMenu[]): NavMenu[] {
    let childrenTree: NavMenu[] = [];
    list.forEach(item => {
      if (item.parentId === navMenuId) {
        childrenTree = list.filter(f => f.navMenuId === item.navMenuId);
        childrenTree = childrenTree.concat(this.resolveChildren(item.navMenuId, this.navMenuList));
      }
    });
    return childrenTree;
  }

}
