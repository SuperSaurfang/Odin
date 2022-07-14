import { Injectable } from '@angular/core';
import { Observable,  Subject, timer } from 'rxjs';
import { DataProcessState, Notification, Status } from 'src/app/core';

const LOCALSTORAGE_KEY = 'notifications';

const DEFAULT_NOTIFICATION = {
  date: new Date(Date.now()),
  status: Status.Info,
  message: 'Status in Ordung.'
};
@Injectable()
export class NotificationService {

  private notificationSubject = new Subject<Notification>();
  private processStatSubject = new Subject<DataProcessState>();

  constructor() {

  }

  public getNotification(): Observable<Notification> {
    return this.notificationSubject;
  }

  public getProcessState(): Subject<DataProcessState> {
    return this.processStatSubject;
  }

  public getNotificationHistory(): Notification[] {
    return this.getNotifications();
  }

  public pushNotification(notification: Notification): void {
    this.notificationSubject.next(notification);

    this.updateNotifications(notification);
    this.resetNotfication();
  }

  public pushProcessState(dataProcessState: DataProcessState) {
    this.processStatSubject.next(dataProcessState);
  }

  public clearNotifications() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }

  public filterDefaultNotfication(notification: Notification) {
    return DEFAULT_NOTIFICATION === notification;
  }

  private updateNotifications(notification: Notification) {
    const notifications = this.getNotifications();
    notifications.push(notification);

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(notifications));
  }

  private  getNotifications() {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    let notifications: Notification[] = [];
    if (data !== null) {
      notifications = JSON.parse(data);
      notifications.forEach(notification => {
        notification.date = new Date(notification.date);
      });
    }
    return notifications;
  }

  private resetNotfication() {
    const resetTimer = timer(2500);
    resetTimer.subscribe(_ => {
      this.notificationSubject.next(DEFAULT_NOTIFICATION);
    });
  }
}
