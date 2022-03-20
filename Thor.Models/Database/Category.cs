using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Thor.Models.Database
{
    public class Category : IEntity<int>
    {
        public Category()
        {
            ChildCategories = new HashSet<Category>();
            Articles = new HashSet<Article>();
        }
        [NotMapped]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Category> ChildCategories { get; set; }

        [JsonIgnore]
        public Category Parent { get; set; }

        [JsonIgnore]
        public ICollection<Article> Articles { get; set; }

  }
}
