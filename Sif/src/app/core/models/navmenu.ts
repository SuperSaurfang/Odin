export class NavMenu {
  navMenuId: number;
  parentId?: number;
  pageId: number;
  navMenuOrder: number;
  title: string;
  displayText: string;
  isDropdown: boolean;
  children?: NavMenu[];
}
