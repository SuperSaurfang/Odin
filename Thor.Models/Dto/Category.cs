using System.Collections.Generic;
using System.Linq;
using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class Category
{
  public int CategoryId { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public int ArticleCount { get; set; }
  public Category Parent { get; set; }

  public Category() { }
  public Category(DB.Category category)
  {
    CategoryId = category.CategoryId;
    Name = category.Name;
    Description = category.Description;
    ArticleCount = category.Articles.Count;

    if (category.Parent is not null)
    {
      Parent = new Category(category.Parent);
    }
  }
}