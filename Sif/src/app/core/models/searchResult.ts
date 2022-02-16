import { Article } from './article';
import { Category } from './category';
import { Tag } from './tag';

export class SearchResult {
  articles?: Article[];
  categoryList?: Category[];
  tagList?: Tag[];
}
