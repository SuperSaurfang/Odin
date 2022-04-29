import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestCommentService } from '../../services';
import { ChangeResponse, Comment } from 'src/app/core';
import { faCircle, faFilter, faSlash, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { CommentFilterService } from '../../services/comment-filter/comment-filter.service';
import { DateFilter } from 'src/app/core/baseClass';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-comments-list',
  templateUrl: './dashboard-comments-list.component.html',
  styleUrls: ['./dashboard-comments-list.component.scss']
})
export class DashboardCommentsListComponent implements OnInit, OnDestroy {

  public iconUser = faUser;
  public iconCircle = faCircle;
  public iconTrash = faTrash;
  public iconFilter = faFilter;
  public iconSlash = faSlash;

  public comments: Comment[] = [];

  public isIndeterminate = false;
  public isAllSelected = false;
  public selectedComments: boolean[] = [];

  public statusmenuopen = -1;
  public selectedAction = '';

  public startDate: Date;
  public endDate: Date;
  public selectedStatus = 'all';
  public searchTerm = '';

  private filterSubscription: Subscription;

  constructor(private commentService: RestCommentService,
    private filterService: CommentFilterService) { }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  ngOnInit() {
    this.commentService.getCommentList().subscribe(response => {
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

  public OnClose(): void {
    this.statusmenuopen = -1;
  }

  public updateStatus(index: number): void {
    this.commentService.putComment(this.comments[index]).subscribe(response => {
      switch (response.change) {
        case ChangeResponse.Change:
          this.comments.map(item => {
            if (item.commentId === response.model.commentId) {
              item.status = response.model.status;
            }
          });
          this.filterService.applyFilter();
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
          break;
      }
    });

    this.OnClose();
  }

  public executeAction() {
    // do nothing if nothing is selected or no action selected
    if (this.selectedAction === '' || this.selectedComments.filter(a => a === true).length === 0) {
      return;
    }

    for (let index = 0; index < this.selectedComments.length; index++) {
      if (this.selectedComments[index]) {
        this.updateStatus(index);
      }
    }
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
          break;
        case ChangeResponse.Error:
        case ChangeResponse.NoChange:
        default:
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

}
