namespace Thor.Models.Dto;
using System.Collections.Generic;
using DB = Thor.Models.Database;
public class Tag
{
  public int TagId { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public int ArticleCount { get; set; }

  public Tag() {}
  public Tag(DB.Tag tag)
  {
    TagId = tag.TagId;
    Name = tag.Name;
    Description = tag.Description;
    ArticleCount = tag.Articles.Count;
  }
}