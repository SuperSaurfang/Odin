using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Thor.Models.Database
{
    public class Navmenu : IEntity<int>
    {
        public Navmenu()
        {
            ChildNavmenu = new HashSet<Navmenu>();
        }
        [NotMapped]
        public int Id { get; set; }
        public int NavmenuId { get; set; }
        public int? ParentId { get; set; }
        public string Link { get; set; }
        public int NavmenuOrder { get; set; }
        public string DisplayText { get; set; }

        public Navmenu Parent { get; set; }
        public ICollection<Navmenu> ChildNavmenu { get; set; }
    }
}
