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

  public Article() { }

  public Article(DB.Article article)
  {
    ArticleId = article.ArticleId;
    UserId = article.UserId;
    Title = article.Title;
    ArticleText = article.ArticleText;
    CreationDate = article.CreationDate;
    ModificationDate = article.ModificationDate;
    HasCommentsEnabled = article.HasCommentsEnabled;
    HasDateAuthorEnabled = article.HasDateAuthorEnabled;
    Status = article.Status;

    if(article.IsBlog)
    {
      Link = $"/blog/{article.Title}";
    }

    if(article.IsPage)
    {
      Link = $"/page/{article.Title}";
    }

    if(article.Comments.Count > 0) {
      var comments = new List<Comment>();
      foreach (var item in article.Comments)
      {
        if(item.AnswerOf is not null)
        {
          continue;
        }

        comments.Add(new Comment(item));
      }
      Comments = comments;
    }

    if(article.Categories.Count > 0) {
      var categories = new List<Category>();
      foreach (var item in article.Categories)
      {
        categories.Add(new Category(item));
      }
      Categories = categories;
    }

    if(article.Tags.Count > 0) {
      var tags = new List<Tag>();
      foreach (var item in article.Tags)
      {
        tags.Add(new Tag(item));
      }
      Tags = tags;
    }
  }
}
