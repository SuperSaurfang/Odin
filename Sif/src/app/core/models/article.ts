export class Article {
  articleId?: number;
  title?: string;
  author?: string;
  articleText?: string;
  creationDate?: Date;
  modificationDate?: Date;
  hasCommentsEnabled?: boolean;
  hasDateAuthorEnabled?: boolean;
  status?: string
}

export enum Status {
  Trash,
  All,
  Draft,
  Private,
  Public
}
