import { User } from '@auth0/auth0-angular';
import { Category } from './category';
import { Tag } from './tag';

export type ArticleStatus =  'trash' | 'draft' | 'private' | 'public';

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
  status?: ArticleStatus;
  categories?: Category[];
  tags?: Tag[];
  link?: string;
}
