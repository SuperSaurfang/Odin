import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Notification } from 'src/app/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-notification-log',
  templateUrl: './dashboard-notification-log.component.html',
  styleUrls: ['./dashboard-notification-log.component.scss']
})
export class DashboardNotificationLogComponent implements OnInit, OnDestroy {
  public dangerIcon = faExclamationTriangle;
  public infoIcon = faInfoCircle;
  public okIcon = faCheckCircle;
  public warnIcon = faExclamationCircle;

  public trashIcon = faTrash;

  public history: Notification[] = [];

  private subscription: Subscription;
  constructor(private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.history = this.notificationService.getNotificationHistory();

    this.subscription = this.notificationService.getNotification()
      .pipe(filter(notification => !this.notificationService.filterDefaultNotfication(notification)))
      .subscribe(notification => {
        this.history.push(notification);
      });
  }

  public onDeleteNotifications() {
    this.history = [];
    this.notificationService.clearNotifications();
  }

}
