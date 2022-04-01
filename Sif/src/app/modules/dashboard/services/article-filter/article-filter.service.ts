import { Injectable } from '@angular/core';
import { Article } from 'src/app/core';
import { FilterBase } from 'src/app/core/baseClass/filter-base.service';

@Injectable()
export class ArticleFilterService extends FilterBase<Article> {

  constructor() {
    super();
  }

  public applyFilter() {
    let filtered = this.originObject;
    // filter period
    if (!this.currentFilter.dateFilter.startDate && this.currentFilter.dateFilter.endDate) {
      filtered = filtered.filter(article => article.modificationDate <= this.currentFilter.dateFilter.endDate);
    } else if (!this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) {
      filtered = filtered.filter(article => article.modificationDate >= this.currentFilter.dateFilter.startDate);
    } else if (this.currentFilter.dateFilter.endDate && this.currentFilter.dateFilter.startDate) {
      filtered = filtered.filter(article => article.modificationDate >= this.currentFilter.dateFilter.startDate
        && article.modificationDate <= this.currentFilter.dateFilter.endDate);
    }

    // filter status
    if (this.currentFilter.status !== 'all') {
      filtered = filtered.filter(article => article.status === this.currentFilter.status);
    }

    // simple search
    if (this.currentFilter.searchTerm.length > 0) {
      filtered = filtered.filter(article =>
        article.user.nickname.includes(this.currentFilter.searchTerm) || article.title.includes(this.currentFilter.searchTerm)
        );
    }
    this.filteredObject.next(filtered);
  }

}
