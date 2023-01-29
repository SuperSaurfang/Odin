import { Component, OnInit } from '@angular/core';
import { Article, Paging } from 'src/app/core/models';
import { RestService } from 'src/app/core/services/rest/rest.service';
import { PageChangeEvent } from 'src/app/shared-modules/paginator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public articles: Article[] = [];
  public paging: Paging = {
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1,
  }

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.loadArticles()
  }

  public onPageChange(event: PageChangeEvent) {
    this.paging.currentPage = event.page;
    this.loadArticles();
  }

  private loadArticles() {
    this.restService.getBlog(this.paging).subscribe(response => {
      this.articles = response.articles;
      this.paging = response.paging;
    })
  }

}
