
using NavmenuDto = Thor.Models.Dto.Navmenu;
using NavmenuDb = Thor.Models.Database.Navmenu;
using System.Collections.Generic;
using System.Linq;

namespace Thor.Models.Mapping;

public static class NavmenuMapping
{
    public static NavmenuDto ToNavmenuDto(this NavmenuDb navmenu) 
    {
        var navmenuDto = new NavmenuDto {
            NavmenuId = navmenu.Id,
            Link = navmenu.Link,
            NavmenuOrder = navmenu.NavmenuOrder,
            DisplayText = navmenu.DisplayText,
            IsDropdowm = navmenu.ChildNavmenu.Count > 0,
            IsLabel = navmenu.Link is null ? true : navmenu.Link.Length == 0,
        };

        if (navmenu.ChildNavmenu.Count > 0)
        {
            navmenuDto.Children = navmenu.ChildNavmenu
                .ToNavmenuDtos()
                .OrderBy(n => n.NavmenuOrder);
        }
        return navmenuDto;
    }

    public static IEnumerable<NavmenuDto> ToNavmenuDtos(this IEnumerable<NavmenuDb> navmenus) 
    {
        return navmenus.ConvertList<NavmenuDb, NavmenuDto>(n => n.ToNavmenuDto());
    }
}