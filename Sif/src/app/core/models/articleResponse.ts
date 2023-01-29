import { Article } from "./article";
import { Paging } from "./paging";

export class ArticleResponse {
  articles: Article[];
  paging: Paging;
}