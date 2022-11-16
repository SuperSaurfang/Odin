export class SearchRequest {
  term: string;
  start: Date;
  end: Date;
  isTextSearch: boolean;
  isTitleSearch: boolean;
  isTagSearch: boolean;
  isCategorySearch: boolean;
}
