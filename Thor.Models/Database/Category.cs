using System.Collections.Generic;
using DTO = Thor.Models.Dto;

namespace Thor.Models.Database;

public class Category : IEntity<int>
{
    public Category() { }
    public Category(DTO.Category category)
    {
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public virtual ICollection<Category> ChildCategories { get; set; }
    public virtual Category Parent { get; set; }
    public ICollection<Article> Articles { get; set; }

}
