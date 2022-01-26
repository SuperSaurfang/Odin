import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public article: Article;

  constructor(private route: ActivatedRoute, private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restService.getPage(params['title']).subscribe(response => {
        this.article = response;
      });
    });
  }

}
