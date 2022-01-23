import { Category } from './category';

export class Article {
  articleId?: number;
  title?: string;
  author?: string;
  userId?: string;
  articleText?: string;
  creationDate?: Date;
  modificationDate?: Date;
  hasCommentsEnabled?: boolean;
  hasDateAuthorEnabled?: boolean;
  status?: string;
  categories?: Category[];
}
