export class NavMenu {
  navMenuId?: number;
  parentId?: number;
  link?: string;
  navMenuOrder?: number;
  displayText?: string;
  isDropdown?: boolean;
  isLabel?: boolean;
  childNavmenu?: NavMenu[];
}
