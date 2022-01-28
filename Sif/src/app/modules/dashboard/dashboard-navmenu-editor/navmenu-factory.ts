import { NavMenu } from 'src/app/core';

export type MenuType = 'page' | 'category' | 'label';

export function createNavMenuLink(type: MenuType, menu: NavMenu): NavMenu {
  switch (type) {
    case 'page':
      return pageMenu(menu);
    case 'category':
      return categoryMenu(menu);
    case 'label':
      return menu;
  }
}

function pageMenu(menu: NavMenu): NavMenu {
  return {
    link: `/page/${menu.displayText}`,
    displayText: menu.displayText,
    navMenuOrder: menu.navMenuOrder
  };
}

function categoryMenu(menu: NavMenu): NavMenu {
  return {
    link: `/category/${menu.displayText}`,
    displayText: menu.displayText,
    navMenuOrder: menu.navMenuOrder
  };
}


