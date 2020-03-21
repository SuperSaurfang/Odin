using System;
using System.Collections.Generic;

namespace Thor.Models
{
    public class Comment
    {
        public int CommentId {get; set;}
        public int ArticleId {get; set;}
        public int? AnswerOf {get; set;}
        public string CommentText {get; set;}
        public DateTime CreationDate {get; set;}
        public string UserName {get; set;}
        public string UserMail {get; set;}
        public string UserRank {get; set;}
        public List<Comment> Answers {get; set;}
    }
}