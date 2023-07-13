using System;
using System.Collections.Generic;
using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class Comment
{
  public int CommentId { get; set; }
  public int ArticleId { get; set; }
  public string ArticleTitle { get; set; }
  public string UserId { get; set; }
  public User User { get; set; }
  public int? AnswerOf { get; set; }
  public string CommentText { get; set; }
  public DateTime CreationDate { get; set; }
  public string Status { get; set; }
  public IEnumerable<Comment> Replies { get; set; }

  public Comment() { }
  public Comment(DB.Comment comment)
  {
    CommentId = comment.CommentId;
    ArticleId = comment.ArticleId;
    UserId = comment.UserId;
    AnswerOf = comment.AnswerOf;
    CommentText = comment.CommentText;
    CreationDate = comment.CreationDate;
    Status = comment.Status;

    if (comment.Article is not null)
    {
      ArticleTitle = comment.Article.Title;
    }

    if (comment.Replies.Count > 0)
    {
      var replies = new List<Comment>();
      foreach (var item in comment.Replies)
      {
        replies.Add(new Comment(item));
      }
      Replies = replies;
    }
  }
}