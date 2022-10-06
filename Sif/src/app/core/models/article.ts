import { User } from '@auth0/auth0-angular';
import { Category } from './category';
import { Tag } from './tag';

export class Article {
  articleId?: number;
  title?: string;
  user?: User;
  userId?: string;
  articleText?: string;
  creationDate?: Date;
  modificationDate?: Date;
  hasCommentsEnabled?: boolean;
  hasDateAuthorEnabled?: boolean;
  status?: string;
  categories?: Category[];
  tags?: Tag[];
  link?: string;
}
