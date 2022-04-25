export class Category {
  categoryId: number;
  name: string;
  description: string;
  articleCount: number;
  parent?: Category;
}
