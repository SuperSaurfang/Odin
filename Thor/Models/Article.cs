using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Thor.Models
{
  public class Article
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public int ArticleId { get; set; }
    public int? UserId { get; set; }
    public string Title { get; set; }
    public string ArticleText { get; set; }
    public string Author { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime ModificationDate { get; set; }
    public bool HasCommentsEnabled { get; set; }
    public bool HasDateAuthorEnabled { get; set; }

    public string Status { get; set; }
    public bool? IsBlog { get; set; }
    public bool? IsSite { get; set; }
  }
}