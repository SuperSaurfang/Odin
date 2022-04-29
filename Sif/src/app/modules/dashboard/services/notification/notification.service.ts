import { Injectable } from '@angular/core';
import { Observable,  Subject, timer } from 'rxjs';
import { DataProcessState, Notification, Status } from 'src/app/core';

const LOCALSTORAGE_KEY = 'notifications';

@Injectable()
export class NotificationService {

  // the storage of the notifications should be improved
  private oldNotifications: Notification[] = [];
  private notificationSubject = new Subject<Notification>();
  private processStatSubject = new Subject<DataProcessState>();

  constructor() {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (data !== null) {
      this.oldNotifications = JSON.parse(data);
      this.oldNotifications.forEach(notification => {
        notification.date = new Date(notification.date);
      });
    }
  }

  public getNotification(): Observable<Notification> {
    return this.notificationSubject;
  }

  public getProcessState(): Subject<DataProcessState> {
    return this.processStatSubject;
  }

  public getNotificationHistory(): Notification[] {
    return this.oldNotifications;
  }

  public pushNotification(notification: Notification): void {
    this.oldNotifications.push(notification);
    this.notificationSubject.next(notification);

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.oldNotifications));
    this.resetNotfication();
  }

  public pushProcessState(dataProcessState: DataProcessState) {
    this.processStatSubject.next(dataProcessState);
  }

  public clearNotifications() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }

  private resetNotfication() {
    const resetTimer = timer(2500);
    resetTimer.subscribe(_ => {
      this.notificationSubject.next({
        date: new Date(Date.now()),
        status: Status.Info,
        message: 'Status in Ordung.'
      });
    });
  }
}
