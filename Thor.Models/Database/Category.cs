using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using DTO = Thor.Models.Dto;

namespace Thor.Models.Database
{
  public class Category : IEntity<int>
  {
    public Category()
    {
      ChildCategories = new HashSet<Category>();
      Articles = new HashSet<Article>();
      ArticleCategories = new HashSet<ArticleCategory>();
    }

    public Category(DTO.Category category)
      : this()
    {
      CategoryId = category.CategoryId;
      Name = category.Name;
      Description = category.Description;
      if (category.Parent is not null)
      {
        ParentId = category.Parent.CategoryId;
      }
    }

    [NotMapped]
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public ICollection<Category> ChildCategories { get; set; }

    [JsonIgnore]
    public Category Parent { get; set; }

    [JsonIgnore]
    public ICollection<Article> Articles { get; set; }
    public ICollection<ArticleCategory> ArticleCategories { get; set; }

  }
}
