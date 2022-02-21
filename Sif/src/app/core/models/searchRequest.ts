export class SearchRequest {
  term: string;
  from?: Date;
  to?: Date;
  isTextSearch: boolean;
  isTitleSearch: boolean;
  isTagSearch: boolean;
  isCategorySearch: boolean;
}
