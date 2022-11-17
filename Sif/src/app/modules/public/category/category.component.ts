import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category = '';
  public articles: Article[] = [];

  constructor(private route: ActivatedRoute, private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];

      this.restService.getCategoryByName(this.category).subscribe(articles => {
        console.log(articles);
        this.articles = articles;
      });
    });
  }

}
