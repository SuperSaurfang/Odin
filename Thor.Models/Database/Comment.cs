using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using DTO = Thor.Models.Dto;

namespace Thor.Models.Database
{
    public  class Comment : IEntity<int>
    {
        public Comment()
        {
            Replies = new HashSet<Comment>();
        }

        public Comment(DTO.Comment comment)
          : this()
        {
         CommentId = comment.CommentId;
         ArticleId = comment.ArticleId;
         UserId = comment.UserId;
         AnswerOf = comment.AnswerOf;
         CommentText = comment.CommentText;
         CreationDate = DateTime.UtcNow;
         Status = comment.Status;
        }

        [NotMapped]
        public int Id { get; set; }
        public int CommentId { get; set; }
        public int ArticleId { get; set; }
        public string UserId { get; set; }
        public int? AnswerOf { get; set; }
        public string CommentText { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }
        public ICollection<Comment> Replies { get; set; }

        [JsonIgnore]
        public Comment AnswerOfNavigation { get; set; }
        [JsonIgnore]
        public Article Article { get; set; }
    }
}
