import { Component, OnDestroy, OnInit } from '@angular/core';

import { faCheck, faExclamationCircle, faExclamationTriangle, faCircleInfo, faSpinner, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/core';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.scss']
})
export class DashboardNotificationComponent implements OnInit, OnDestroy {

  public spinnerIcon = faCheck.iconName;
  public isSpinning = false;
  public processingMessage = 'Keine Daten zu verarbeiten';

  public statusIcon = faCircleCheck.iconName;
  public notificationMessage = 'Keine Statusmeldung vorhanden';
  public date = new Date();
  public statusClass = 'info';

  public isNotificationLogOpen = false;

  private subscriptions: Subscription[] = [];
  constructor(private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.notificationService.getNotification().subscribe(notification => {
      this.mapStatus(notification.status);
      this.notificationMessage = notification.message;
      this.date = notification.date;
    }));
    this.subscriptions.push(this.notificationService.getProcessState().subscribe(dataProcessState => {
      this.isSpinning = dataProcessState.isProcessing;
      this.spinnerIcon = dataProcessState.isProcessing ? faSpinner.iconName : faCheck.iconName;
      this.processingMessage = dataProcessState.message;
    }));
  }

  public onNotificationLogOpen(): void {
    this.isNotificationLogOpen = !this.isNotificationLogOpen;
  }

  private mapStatus(status: Status) {
    switch (status) {
      case Status.Error:
        this.statusIcon = faExclamationTriangle.iconName;
        this.statusClass = 'danger';
        break;
      case Status.Info:
        this.statusIcon = faCircleInfo.iconName;
        this.statusClass = 'info';
        break;
      case Status.Ok:
        this.statusIcon = faCircleCheck.iconName;
        this.statusClass = 'ok';
        break;
      case Status.Warning:
        this.statusIcon = faExclamationCircle.iconName;
        this.statusClass = 'warn';
        break;
    }
  }

}
