using System.Collections.Generic;
using System.Linq;
using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class Navmenu
{
  public int NavmenuId { get; set; }
  public int? ParentId { get; set; }
  public string Link { get; set; }
  public int NavmenuOrder { get; set; }
  public string DisplayText { get; set; }
  public bool IsDropdowm { get; set; }
  public bool IsLabel { get; set; }

  public IEnumerable<Navmenu> Children { get; set; }

  public Navmenu() { }

  public Navmenu(DB.Navmenu navmenu, bool shouldApplyChilds = true)
  {
    NavmenuId = navmenu.NavmenuId;
    ParentId = navmenu.ParentId;
    Link = navmenu.Link;
    NavmenuOrder = navmenu.NavmenuOrder;
    DisplayText = navmenu.DisplayText;
    IsDropdowm = navmenu.ChildNavmenu.Count > 0;
    IsLabel = navmenu.Link is null ? true : navmenu.Link.Length == 0;

    if (navmenu.ChildNavmenu.Count > 0 && shouldApplyChilds)
    {
      var childnavmenu = new List<Navmenu>();
      foreach (var item in navmenu.ChildNavmenu)
      {
        childnavmenu.Add(new Navmenu(item));
      }
      //Add ordering here to nav children
      Children = childnavmenu.OrderBy(n => n.NavmenuOrder);
    }
  }
}