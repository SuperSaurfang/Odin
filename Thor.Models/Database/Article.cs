using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Thor.Models.Database
{
    public class Article : IEntity<int>
    {
        public Article()
        {
            Comments = new HashSet<Comment>();
            Categories = new HashSet<Category>();
            Tags = new HashSet<Tag>();
        }

        [NotMapped]
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string ArticleText { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
        public bool? HasCommentsEnabled { get; set; }
        public bool? HasDateAuthorEnabled { get; set; }
        public string Status { get; set; }
        public bool IsBlog { get; set; }
        public bool IsPage { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
