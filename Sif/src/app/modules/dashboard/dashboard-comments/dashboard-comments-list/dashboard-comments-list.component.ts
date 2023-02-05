import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestCommentService } from '../../services';
import { ChangeResponse, Comment, CommentStatus, Status } from 'src/app/core';
import { CommentFilterService } from '../../services/comment-filter/comment-filter.service';
import { DateFilter } from 'src/app/core/baseClass';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-comments-list',
  templateUrl: './dashboard-comments-list.component.html',
  styleUrls: ['./dashboard-comments-list.component.scss']
})
export class DashboardCommentsListComponent implements OnInit, OnDestroy {

  public comments: Comment[] = [];

  public isIndeterminate = false;
  public isAllSelected = false;
  public selectedComments: boolean[] = [];

  public statusmenuopen = -1;
  public selectedAction: CommentStatus = undefined;

  public startDate: Date;
  public endDate: Date;
  public selectedStatus = 'all';
  public searchTerm = '';

  private filterSubscription: Subscription;

  constructor(private commentService: RestCommentService,
    private filterService: CommentFilterService,
    private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  ngOnInit() {
    this.commentService.getCommentList().subscribe(response => {
      this.pushNotification('Die Kommentare wurden geladen.', Status.Info);
      this.setData(response);
    });
  }

  private setData(comments: Comment[]) {
      this.filterSubscription = this.filterService.filtered().subscribe(filteredComments => {
        this.comments = filteredComments;

        this.selectedComments = [];
        this.comments.forEach(comment => {
          this.selectedComments.push(false);
        });
      });
      this.filterService.setFilterObject(comments);
  }

  public setSelectedComment(index: number) {
    this.selectedComments[index] = !this.selectedComments[index];
    const result = this.selectedComments.filter(b => b === true);
    if (result.length === this.selectedComments.length) {
      this.isAllSelected = true;
      this.isIndeterminate = false;
    } else if (result.length === 0) {
      this.isAllSelected = false;
      this.isIndeterminate = false;
    } else {
      this.isAllSelected = false;
      this.isIndeterminate = true;
    }
  }

  public setAllSelected(event: boolean) {
    this.isAllSelected = event;
    this.isIndeterminate = false;
    for (let index = 0; index < this.selectedComments.length; index++) {
      if (this.isAllSelected) {
        this.selectedComments[index] = true;
      } else {
        this.selectedComments[index] = false;
      }
    }
  }

  public getTooltipText(status: string): string {
    switch (status) {
      case 'new':
        return 'Status: Neu';
      case 'released':
        return 'Status: Veröffentlicht';
      case 'spam':
        return 'Status: Spam';
      default:
        return 'Papierkorb';
    }
  }

  public openMenu(index: number): void {
    this.statusmenuopen = index;
  }

  public onClose(): void {
    this.statusmenuopen = -1;
  }

  public updateStatus(index: number, status: CommentStatus): void {
    const comment = this.comments[index];
    comment.status = status;
    this.commentService.putComment(comment).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.filterService.applyFilter();
          this.pushNotification('Der Status wurde aktualisiert.', Status.Ok);
          break;
        case ChangeResponse.Error:
          this.pushNotification('Fehler beim aktualisieren des Status.', Status.Error);
          break;
        case ChangeResponse.NoChange:
          this.pushNotification('Der Status konnte nicht aktualisiert werden.', Status.Info);
          break;
      }
    });

    this.onClose();
  }

  public executeAction() {
    // do nothing if nothing is selected or no action selected
    if (this.selectedAction === undefined || this.selectedComments.filter(a => a === true).length === 0) {
      return;
    }

    this.notificationService.startProcess('Aktualisiere die Status von Kommentaren.');
    for (let index = 0; index < this.selectedComments.length; index++) {
      if (this.selectedComments[index]) {
        this.updateStatus(index, this.selectedAction);
      }
    }
    this.notificationService.stopProcess('Aktualisierung der Status abgeschlossen.');
  }

  public resetFilter() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.selectedStatus = 'all';
    this.searchTerm = '';
    this.filterService.resetFilter();
  }

  public clearTrash() {
    this.commentService.deleteComments().subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.setData(response.model);
          this.filterService.applyFilter();
          this.pushNotification('Der Papierkorb wurde geleert.', Status.Ok);
          break;
        case ChangeResponse.Error:
          this.pushNotification('Fehler beim leeren des Papierkorbes.', Status.Error);
          break;
        case ChangeResponse.NoChange:
          this.pushNotification('Der Papierkorb wurde nicht geleert.', Status.Info);
          break;
      }
    });
  }

  public updateDateFilter() {
    const dateFilter: DateFilter = {};
    if (this.endDate) {
      dateFilter.endDate = new Date(this.endDate);
      dateFilter.endDate.setHours(23, 59, 59);
    }

    if (this.startDate) {
      dateFilter.startDate = new Date(this.startDate);
      dateFilter.startDate.setHours(0, 0, 0);
    }
    this.filterService.updateDateFilter(dateFilter);
  }

  public updateStatusFilter() {
    this.filterService.updateStatusFilter(this.selectedStatus);
  }

  public updateSearchTerm() {
    this.filterService.searchFilter(this.searchTerm);
  }

  private pushNotification(message: string, status: Status) {
    this.notificationService.pushNotification({
      date: new Date(Date.now()),
      message: message,
      status: status
    });
  }

}
