import * as uuid from 'uuid';

export interface BaseNode<T extends BaseNode<T>> {
  children?: T[];
}

export class NestedDragDropDatasource<T extends BaseNode<T>> {
  data: T;
  id: string;
  children: NestedDragDropDatasource<T>[] = [];

  constructor(data: T) {
    this.data = data;
    this.id = uuid.v4();
    if(data.children) {
      data.children.forEach((item) => {
        const source = new NestedDragDropDatasource<T>(item);
        this.children.push(source);
      });
    }
  }
}
