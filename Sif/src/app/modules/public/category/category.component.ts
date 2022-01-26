import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/core';
import { RestService } from 'src/app/core/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public folderIcon = faFolder;
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
