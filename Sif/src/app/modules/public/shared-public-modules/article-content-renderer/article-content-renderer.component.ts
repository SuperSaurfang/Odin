import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/core';
import { UserService } from 'src/app/core/services';

type ArticleType = 'blog' | 'page';

@Component({
  selector: 'app-article-content-renderer',
  templateUrl: './article-content-renderer.component.html',
  styleUrls: ['./article-content-renderer.component.scss']
})
export class ArticleContentRendererComponent implements OnInit {
  @Input()
  public article: Article;

  @Input()
  public articleType: ArticleType = 'blog';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public hasPermisson(): boolean {
    return this.userService.hasUserPermission(['admin', 'author']);
  }
}
