import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-article-result',
  templateUrl: './article-result.component.html',
  styleUrls: ['./article-result.component.scss']
})
export class ArticleResultComponent implements OnInit {

  @Input()
  public articles: Article[] = [];

  constructor() { }

  ngOnInit() {
  }

}
