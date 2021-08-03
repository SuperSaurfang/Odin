import { Injectable } from '@angular/core';
import { FilterBase } from 'src/app/core/baseClass/filter-base.service';
import { Comment } from 'src/app/core/models/';

@Injectable()
export class CommentFilterService extends FilterBase<Comment> {

  constructor() {
    super();
  }

  public applyFilter() {
    let filtered = this.originObject;
    // filter period
    if (!this.currentFilter.dateFilter.startDate && this.currentFilter.dateFilter.endDate) {
      filtered = filtered.filter(comment => comment.creationDate <= this.currentFilter.dateFilter.endDate);
    } else if (!this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) {
      filtered = filtered.filter(comment => comment.creationDate >= this.currentFilter.dateFilter.startDate);
    } else if (this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) {
      filtered = filtered.filter(comment => comment.creationDate >= this.currentFilter.dateFilter.startDate
        && comment.creationDate <= this.currentFilter.dateFilter.endDate);
    }

    // filter status
    if (this.currentFilter.status !== 'all') {
      filtered = filtered.filter(article => article.status === this.currentFilter.status);
    }

    // simple search
    if (this.currentFilter.searchTerm.length > 0) {
      filtered = filtered.filter(comment =>
        comment.user.nickname.includes(this.currentFilter.searchTerm)
        || comment.commentText.includes(this.currentFilter.searchTerm)
        || comment.articleTitle.includes(this.currentFilter.searchTerm)
        );
    }
    this.filteredObject.next(filtered);
  }

}
