import { Article } from './article';
import { Tag } from './tag';

export class ArticleTag {
  constructor(article: Article, tag: Tag) {
    this.articleId = article.articleId;
    this.tagId = tag.tagId;
  }

  articleId: number;
  tagId: number;
}
