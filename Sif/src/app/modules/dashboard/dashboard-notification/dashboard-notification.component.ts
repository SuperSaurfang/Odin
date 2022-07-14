import { Component, OnDestroy, OnInit } from '@angular/core';

import { faCheck, faExclamationCircle, faExclamationTriangle, faCircleInfo, faSpinner, faAngleUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/core';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.scss']
})
export class DashboardNotificationComponent implements OnInit, OnDestroy {

  public spinnerIcon = faCheck;
  public isSpinning = false;
  public processingMessage = 'Keine Daten zu verarbeiten';

  public statusIcon = faCircleCheck;
  public notificationMessage = 'Keine Statusmeldung vorhanden';
  public date = new Date();
  public statusClass = 'info';

  public historyIcon = faAngleUp;

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
      this.spinnerIcon = dataProcessState.isProcessing ? faSpinner : faCheck;
      this.processingMessage = dataProcessState.message;
    }));
  }

  public onNotificationLogOpen(): void {
    this.isNotificationLogOpen = !this.isNotificationLogOpen;
  }

  private mapStatus(status: Status) {
    switch (status) {
      case Status.Error:
        this.statusIcon = faExclamationTriangle;
        this.statusClass = 'danger';
        break;
      case Status.Info:
        this.statusIcon = faCircleInfo;
        this.statusClass = 'info';
        break;
      case Status.Ok:
        this.statusIcon = faCircleCheck;
        this.statusClass = 'ok';
        break;
      case Status.Warning:
        this.statusIcon = faExclamationCircle;
        this.statusClass = 'warn';
        break;
    }
  }

}
