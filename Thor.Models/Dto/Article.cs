using System;
using System.Collections.Generic;
using System.Linq;
using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class Article
{
  public int ArticleId { get; set; }
  public string UserId { get; set; }
  public string Title { get; set; }
  public string ArticleText { get; set; }
  public DateTime CreationDate { get; set; }
  public DateTime ModificationDate { get; set; }
  public bool? HasCommentsEnabled { get; set; }
  public bool? HasDateAuthorEnabled { get; set; }
  public string Status { get; set; }
  public string Link { get; set; }
  public User User { get; set; }
  public IEnumerable<Comment> Comments { get; set; }
  public IEnumerable<Category> Categories { get; set; }
  public IEnumerable<Tag> Tags { get; set; }
}
