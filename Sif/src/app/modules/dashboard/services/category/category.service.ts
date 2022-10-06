import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category, ChangeResponse, Notification, Status, StatusResponseType } from 'src/app/core';
import { NotificationService } from '../notification/notification.service';
import { RestCategoryService } from '../rest-category/rest-category.service';

@Injectable()
export class CategoryService {

  private categories: Category[] = [];
  private categoryList = new Subject<Category[]>();
  constructor(private restService: RestCategoryService,
    private notificationService: NotificationService) { }


  public getCategoryList(): Observable<Category[]> {
    this.restService.getCategoryList().subscribe(response => {
      this.categories = response;
      this.categoryList.next(response);
      this.notificationService.pushNotification({
        date: new Date(Date.now()),
        message: 'Kategorien wurden geladen.',
        status: Status.Ok
      });
    });
    return this.categoryList;
  }

  public updateCategory(category: Category) {
    this.restService.updateCategory(category).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Update) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Update);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.categories = this.update(this.categories, response.model);
          this.next(this.categories);
          notification.message = 'Die Kategorie wurde aktualisiert.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Die Kategorie konnte nicht aktualisiert werden.';
          notification.status = Status.Info;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim aktualisieren der Kategorie.';
          notification.status = Status.Error;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public deleteCategory(id: number) {
    this.restService.deleteCategory(id).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Delete) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Delete);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.categories = response.model;
          this.next(this.categories);
          notification.message = 'Die Kategorie wurde gelöscht.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim löschen der Kategorie.';
          notification.status = Status.Error;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Die Kategorie konnte nicht gelöscht werden.';
          notification.status = Status.Info;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public createCategory(category: Category): Observable<boolean> {
    const resultSubject = new Subject<boolean>();

    this.restService.createCategory(category).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Create) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Create);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.categories.push(response.model);
          this.next(this.categories);
          notification.message = 'Neue Kategorie wurde erfolgreich erstellt.';
          notification.status = Status.Ok;
          resultSubject.next(true);
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim erstellen einer neuen Kategorie.';
          notification.status = Status.Error;
          resultSubject.next(false);
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Neue Kategorie konnte nicht erstellt werden.';
          notification.status = Status.Info;
          resultSubject.next(false);
          break;
      }
      this.notificationService.pushNotification(notification);
    });
    return resultSubject;
  }

  private update(categories: Category[], category: Category): Category[] {
    categories.map(item => {
      if (item.categoryId === category.categoryId) {
        item.articleCount = item.articleCount;
        item.description = category.description;
        item.name = category.name;
        item.parent = category.parent;
      }
    });
    return categories;
  }

  private next(categories: Category[]) {
    this.categoryList.next(categories);
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
