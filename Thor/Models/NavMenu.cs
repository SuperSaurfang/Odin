using System.Collections.Generic;

namespace Thor.Models
{
  public class NavMenu
  {
    public int NavMenuId { get; set; }
    public int? ParentId { get; set; }
    public int PageId { get; set; }
    public int NavMenuOrder { get; set; }
    public string Title { get; set; }
    public string DisplayText { get; set; }
    public bool IsDropdowm { get; set; }
    public List<NavMenu> Children { get; set; }

  }
}