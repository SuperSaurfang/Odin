using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Thor.Models.Database
{
    public class Tag : IEntity<int>
    {
        public Tag()
        {
            Articles = new HashSet<Article>();
            ArticleTags = new HashSet<ArticleTag>();
        }

        public Tag(Dto.Tag tag)
          : this()
        {
          TagId = tag.TagId;
          Name = tag.Name;
          Description = tag.Description;
        }

        [NotMapped]
        public int Id { get; set; }
        public int TagId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public ICollection<Article> Articles { get; set; }
        public ICollection<ArticleTag> ArticleTags { get; set; }
    }
}
