using System.Collections.Generic;

namespace Thor.Models.Database;

public class Tag : IEntity<int>
{
    public Tag()
    {

    }
    public Tag(Dto.Tag tag)
    {

    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public virtual ICollection<Article> Articles { get; set; }
}
