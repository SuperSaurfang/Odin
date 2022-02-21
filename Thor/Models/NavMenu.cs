using System.Collections.Generic;

namespace Thor.Models
{
  public class NavMenu
  {
    public int NavMenuId { get; set; }
    public int? ParentId { get; set; }
    public string Link { get; set; }
    public int NavMenuOrder { get; set; }
    public string DisplayText { get; set; }
    public bool IsDropdowm { get; set; }
    public bool IsLabel {get; set;}
    public List<NavMenu> Children { get; set; }

  }
}