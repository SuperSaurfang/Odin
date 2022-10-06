import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChangeResponse, Notification, Status, StatusResponseType, Tag } from 'src/app/core';
import { NotificationService } from '../notification/notification.service';
import { RestTagService } from '../rest-tag/rest-tag.service';

@Injectable()
export class TagService {

  private tagList: Tag[] = [];
  private tagListSubject = new Subject<Tag[]>();
  constructor(private restService: RestTagService,
    private notificationService: NotificationService) { }

  public getTagList(): Observable<Tag[]> {
    this.restService.getTagList().subscribe(tagList => {
      this.tagList = tagList;
      this.next(this.tagList);
      this.notificationService.pushNotification({
        date: new Date(Date.now()),
        message: 'Tags wurden geladen.',
        status: Status.Ok
      });
    });
    return this.tagListSubject;
  }

  public updateTag(tag: Tag) {
    this.restService.updateTag(tag).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Update) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Update);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.tagList = this.update(this.tagList, tag);
          this.next(this.tagList);
          notification.message = 'Der Tag wurde aktualisiert.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Der Tag konnte nicht aktualisiert werden.';
          notification.status = Status.Info;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim aktualisieren des Tags.';
          notification.status = Status.Error;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public deleteTag(id: number) {
    this.restService.deleteTag(id).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Update) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Update);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
          this.tagList = response.model;
          this.next(this.tagList);
          notification.message = 'Der Tag wurde erfolgreich gelöscht.';
          notification.status = Status.Ok;
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Der Tag konnte nicht gelöscht werden.';
          notification.status = Status.Info;
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim löschen des Tags.';
          notification.status = Status.Error;
          break;
      }
      this.notificationService.pushNotification(notification);
    });
  }

  public createTag(tag: Tag): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.restService.createTag(tag).subscribe(response => {
      const notification = this.notification;
      if (response.responseType !== StatusResponseType.Update) {
        this.handleInvlidResponse(response.responseType, StatusResponseType.Update);
        return;
      }

      switch (response.change) {
        case ChangeResponse.Change:
            this.tagList.push(response.model);
            this.next(this.tagList);
            notification.message = 'Neuer Tag wurde erstellt.';
            notification.status = Status.Ok;
            subject.next(true);
          break;
        case ChangeResponse.NoChange:
          notification.message = 'Es konnte kein Tag erstellt werden.';
          notification.status = Status.Info;
          subject.next(false);
          break;
        case ChangeResponse.Error:
          notification.message = 'Fehler beim erstellen des Tags';
          notification.status = Status.Ok;
          subject.next(false);
          break;
      }
      this.notificationService.pushNotification(notification);
    });
    return subject;
  }

  private update(tagList: Tag[], tag: Tag): Tag[] {
    tagList.map(item => {
      if (item.tagId === tag.tagId) {
        item.name = tag.name;
        item.description = tag.description;
        item.articleCount = tag.articleCount;
      }
    });
    return tagList;
  }

  private next(tagList: Tag[]) {
    this.tagListSubject.next(tagList);
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
