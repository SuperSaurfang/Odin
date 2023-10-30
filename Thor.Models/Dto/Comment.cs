using System;
using System.Collections.Generic;
using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class Comment
{
    public int CommentId { get; set; }
    public Article Article { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    public Comment AnswerOf { get; set; }
    public string CommentText { get; set; }
    public DateTime CreationDate { get; set; }
    public string Status { get; set; }
    public IEnumerable<Comment> Replies { get; set; }
}