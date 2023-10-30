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
}