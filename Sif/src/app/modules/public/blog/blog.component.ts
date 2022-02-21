import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/core/models';
import { RestService } from 'src/app/core/services/rest/rest.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public articles: Article[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getBlog().subscribe(articles => {
      this.articles = articles;
    });
  }

}
