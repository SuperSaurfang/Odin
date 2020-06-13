import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services';
import { Article } from 'src/app/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard-post-list',
  templateUrl: './dashboard-post-list.component.html',
  styleUrls: ['./dashboard-post-list.component.scss']
})
export class DashboardPostListComponent implements OnInit {

  constructor(private restService: RestService) { }

  public articles: Article[] = [];
  public isAllSelected = false;
  public isIndeterminate = false;
  public selectedArticles: boolean[] = []

  public trash = faTrash;

  ngOnInit() {
    this.restService.getFullBlog().subscribe(articles => {
      this.articles = articles;
      this.articles.forEach(() => {
        this.selectedArticles.push(false);
      })
    })
  }

  public getSelected(index: number) {
    return this.selectedArticles[index];
  }

  public setSelected(index: number) {
    this.selectedArticles[index] = !this.selectedArticles[index]
    const result = this.selectedArticles.filter(a => a == true);
    if(result.length === this.articles.length) {
      this.isAllSelected = true;
      this.isIndeterminate = false;
    } else if(result.length === 0) {
      this.isIndeterminate = false;
    } else {
      this.isIndeterminate = true;
      this.isAllSelected = false;
    }
  }

  public setAllSelected(isAllSelected: boolean) {
    this.isAllSelected = isAllSelected;
    for (let index = 0; index < this.selectedArticles.length; index++) {
      this.isIndeterminate = false;
      if(this.isAllSelected) {
        this.selectedArticles[index] = true;
      } else {
        this.selectedArticles[index] = false;
      }
    }
  }

  public test() {
    console.log("Hello");
  }

}
