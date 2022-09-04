import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core';
import { faUser, faCalendar, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-result',
  templateUrl: './article-result.component.html',
  styleUrls: ['./article-result.component.scss']
})
export class ArticleResultComponent implements OnInit {
  public userIcon = faUser;
  public calendarIcon = faCalendar;
  public externalLinkIcon = faExternalLinkAlt;

  @Input()
  public articles: Article[] = [];

  constructor() { }

  ngOnInit() {
  }

}
