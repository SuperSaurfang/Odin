import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/core';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public calendar = faCalendar;
  public user = faUser;
  public edit = faEdit;

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
