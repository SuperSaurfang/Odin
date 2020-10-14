export class NavMenu {
  navMenuId: number;
  parentId: number;
  pageId: number;
  title: string;
  displayText: string;
  isDropdown: boolean;
  children?: NavMenu[];
}
