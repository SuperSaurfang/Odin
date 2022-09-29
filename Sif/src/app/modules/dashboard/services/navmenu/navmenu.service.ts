import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeResponse, NavMenu, Notification, Status, StatusResponseType } from 'src/app/core';
import { NotificationService } from '../notification/notification.service';
import { RestNavmenuService } from '../rest-navmenu/rest-navmenu.service';

@Injectable()
export class NavmenuService {

  private navMenuList: NavMenu[] = [];
  private originalList: NavMenu[] = [];
  private navMenuListSubject: BehaviorSubject<NavMenu[]> = new BehaviorSubject(this.navMenuList);

  constructor(private restService: RestNavmenuService,
    private notificationService: NotificationService) {
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
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Update) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Update);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          const index = this.navMenuList.findIndex(item => item.navmenuId === navMenu.navmenuId);
          this.navMenuList[index] = navMenu;
          this.originalList[index] = { ...navMenu };
          this.navMenuListSubject.next(this.navMenuList);
          notification.message = 'Das Navigationmenü Element wurde aktualisiert.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Das Navigationmenü Element wurde nicht aktualisiert.';
          notification.status = Status.Info;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim aktualisieren des Navigationmenü Elementes.';
          notification.status = Status.Error;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public deleteNavMenuEnty(navMenuId: number) {
    this.restService.deleteNavMenu(navMenuId).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Delete) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Delete);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          const index = this.navMenuList.findIndex(item => item.navmenuId === navMenuId);
          this.navMenuList.splice(index, 1);
          this.originalList = this.navMenuList.map(item => Object.assign(new NavMenu(), item));
          this.navMenuListSubject.next(this.navMenuList);
          notification.message = 'Das Navigationmenü Element wurde gelöscht.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Das Navigationmenü Element wurde nicht gelöscht.';
          notification.status = Status.Info;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim löschen des Navigationmenü Elementes.';
          notification.status = Status.Error;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public getNextOrderValue(): number {
    let currentMax = 0;
    currentMax = Math.max.apply(currentMax, this.navMenuList.map(value => value.navmenuOrder));
    return ++currentMax;
  }

  /**
   * Get an observable list of the first level nav menu entries
   */
  public getNavMenuList(): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => list.filter(item => item.parentId === 0 || item.parentId === undefined))
    );
  }

  /**
   * Get an observable list of the children nav menu entries
   * from the parent id
   * @param parentId the id of the nav menu entry to find the children
   */
  public getNavMenuChildren(parentId: number): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => 
        { 
          
          return list.filter(item => item.parentId === parentId) 
        })
    );
  }

  /**
   * Get an observable list for parent selection control
   * @param navMenuId the id of the nav menu entry
   */
  public getNavMenuParent(navMenuId: number): Observable<NavMenu[]> {
    return this.navMenuListSubject.pipe(
      map(list => this.removeInvalidNavMenuEntries(navMenuId, list))
    );
  }

  /**
   * Set the parent of this nav menu entry
   * @param navMenuId the id of the nav menu entry that become the parent
   * @param parentId the id of the children nav menu entry
   */
  public setParent(navMenuId: number, parentId: number) {
    const index = this.navMenuList.findIndex(item => item.navmenuId === navMenuId);
    this.navMenuList[index].parentId = parentId;
    this.navMenuListSubject.next(this.navMenuList);
  }

  /**
   * Remove the parent id
   * @param navMenuId the of the nav menu entry where to remove the parent id
   */
  public removeParent(navMenuId: number) {
    const index = this.navMenuList.findIndex(item => item.navmenuId === navMenuId);
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
      const index = this.originalList.findIndex(item => item.navmenuId === navMenuId);
      this.navMenuList[index] = {...this.originalList[index]};
      this.navMenuListSubject.next(this.navMenuList);
    }
  }

  private removeInvalidNavMenuEntries(navMenuId: number, list: NavMenu[]): NavMenu[]  {
    // remove nav menu entry with the same id, cause it should not be possible to set nav menu entry as parent of itself
    let navMenuList = list.filter(item => item.navmenuId !== navMenuId);

    // get children of nav menu entry, cause it should not be possible to set a children as a parent
    const children = this.resolveChildren(navMenuId, this.navMenuList);
    children.forEach(child => {
      navMenuList = navMenuList.filter(item => item.navmenuId !== child.navmenuId);
    });

    return navMenuList;
  }

  private resolveChildren(navMenuId: number, list: NavMenu[]): NavMenu[] {
    let childrenTree: NavMenu[] = [];
    list.forEach(item => {
      if (item.parentId === navMenuId) {
        childrenTree = list.filter(f => f.navmenuId === item.navmenuId);
        childrenTree = childrenTree.concat(this.resolveChildren(item.navmenuId, this.navMenuList));
      }
    });
    return childrenTree;
  }

  private get notification(): Notification {
    return {
      date: new Date(Date.now()),
      message: '',
      status: Status.Info
    };
  }

  private handleInvlidResponse(currentResponseType: StatusResponseType, expectedResponseType: StatusResponseType) {
    this.notificationService.pushNotification({
      date: new Date(Date.now()),
      message: `Der aktuelle Status Response Type ${currentResponseType} entspricht nicht ${expectedResponseType}`,
      status: Status.Warning
    });
  }

}
