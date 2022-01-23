import { Article,  } from './article';
import { Category } from './category';

export class ArticleCategory {
  constructor(article: Article, category: Category) {
    this.articleId = article.articleId;
    this.categoryId = category.categoryId;
  }

  articleId?: number;
  categoryId?: number;
}
