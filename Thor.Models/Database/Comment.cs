using System;
using System.Collections.Generic;
using DTO = Thor.Models.Dto;

namespace Thor.Models.Database;

public class Comment : IEntity<int>
{
    public Comment()
    {

    }
    public Comment(DTO.Comment comment)
    {

    }

    public int Id { get; set; }
    public string UserId { get; set; }
    public string CommentText { get; set; }
    public DateTime CreationDate { get; set; }
    public CommentStatus Status { get; set; }
    public virtual ICollection<Comment> Replies { get; set; }
    public virtual Comment AnswerOf { get; set; }
    public virtual Article Article { get; set; }
}


