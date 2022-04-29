using System.Collections.Generic;
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
  public bool IsLabel {get; set;}

  public IEnumerable<Navmenu> ChildNavmenu { get; set; }

  public Navmenu() { }

  public Navmenu(DB.Navmenu navmenu)
  {
    NavmenuId = navmenu.NavmenuId;
    ParentId = navmenu.ParentId;
    Link = navmenu.Link;
    NavmenuOrder = navmenu.NavmenuOrder;
    DisplayText = navmenu.DisplayText;
    IsDropdowm = navmenu.ChildNavmenu.Count > 0;
    IsLabel = navmenu.Link is null ? true : navmenu.Link.Length == 0;

    if (navmenu.ChildNavmenu.Count > 0)
    {
      var childnavmenu = new List<Navmenu>();
      foreach (var item in navmenu.ChildNavmenu)
      {
        childnavmenu.Add(new Navmenu(item));
      }
      ChildNavmenu = childnavmenu;
    }
  }
}