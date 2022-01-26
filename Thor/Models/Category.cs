using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace Thor.Models
{
  public class Category
  {
    public int CategoryId { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int ArticleCount { get; set; }

    public override int GetHashCode()
    {
      int hashName = Name == null ? 0 : Name.GetHashCode();

      int hashDescription = Description == null ? 0 : Description.GetHashCode();

      int hashParentId = ParentId == null ? 0 : ParentId.GetHashCode();

      int hashCategoryId = CategoryId.GetHashCode();

      return hashName ^  hashDescription ^ hashParentId ^ hashCategoryId;
    }

    
  }

  public class CategoryEqualityComparer : EqualityComparer<Category>
    {
      public override bool Equals(Category x, Category y)
      {
        return x.CategoryId == y.CategoryId;
      }

      public override int GetHashCode([DisallowNull] Category obj)
      {
        return obj.GetHashCode();
      }
    }
}