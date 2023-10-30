using System.Collections.Generic;

namespace Thor.Models.Database;

public class Navmenu : IEntity<int>
{
    public int Id { get; set; }
    public string Link { get; set; }
    public int NavmenuOrder { get; set; }
    public string DisplayText { get; set; }
    public virtual Navmenu Parent { get; set; }
    public virtual ICollection<Navmenu> ChildNavmenu { get; set; }
}
