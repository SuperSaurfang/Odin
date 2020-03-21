import { Component, OnInit } from '@angular/core';
import { faUser, faCalendar, faComments, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Article } from 'src/app/core/models';
import { RestService } from 'src/app/core/services/rest/rest.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  
  constructor(private restService: RestService) { }

  public calendar = faCalendar;
  public comments = faComments;
  public edit = faEdit;
  public user = faUser;
  public articles: Article[] = [];

  ngOnInit() {
    this.restService.getBlog().subscribe(articles => {
      this.articles = articles;
    })
  }

  public parseDate(date: string) {
    return new Date(date).toLocaleDateString()
  }

}
