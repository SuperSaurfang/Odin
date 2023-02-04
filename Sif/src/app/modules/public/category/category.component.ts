import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleRequest, Paging } from 'src/app/core';
import { RestService } from 'src/app/core/services';
import { PageChangeEvent } from 'src/app/shared-modules/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category = '';
  public articles: Article[] = [];
  public paging: Paging = {
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1,
  }

  constructor(private route: ActivatedRoute, private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];

      this.loadArticles(this.paging);
    });
  }

  public onPageChange(event: PageChangeEvent) {
    this.paging.currentPage = event.page;
    this.loadArticles(this.paging);
  }

  private loadArticles(paging: Paging) {
    const request: ArticleRequest = {
      name: this.category,
      paging: paging
    };
    this.restService.getCategoryByName(request).subscribe(response => {
      this.articles = response.articles
      this.paging = response.paging;
    });
  }

}
