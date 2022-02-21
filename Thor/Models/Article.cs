using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Thor.Models
{
  public class Article
  {
    public int ArticleId { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string ArticleText { get; set; }
    public string Author { get; set; }
    public DateTime? CreationDate { get; set; }
    public DateTime? ModificationDate { get; set; }
    public bool? HasCommentsEnabled { get; set; }
    public bool? HasDateAuthorEnabled { get; set; }
    public List<Category> Categories { get; set; }
    public List<Tag> Tags { get; set; }

    public string Status { get; set; }
    public string Link { get; set; }
    public bool? IsBlog { get; set; }
    public bool? IsPage { get; set; }


    public Article()
    {
      Categories = new List<Category>();
      Tags = new List<Tag>();
    }
  }
}