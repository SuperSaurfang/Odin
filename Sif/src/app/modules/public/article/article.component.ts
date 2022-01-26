import { Component, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public commentsIcon = faComments;
  public article: Article;

  constructor(private route: ActivatedRoute, private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restService.getBlogByTitle(params['title']).subscribe(article => {
        this.article = article;
      });
    });
  }
}
