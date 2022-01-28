import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/core';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public tagIcon = faTag;
  public tag = '';
  public articles: Article[] = [];

  constructor(private route: ActivatedRoute,
    private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.restService.getBlogByTagName(this.tag).subscribe(articles => {
          this.articles = articles;
        });
      }
    });
  }

}
