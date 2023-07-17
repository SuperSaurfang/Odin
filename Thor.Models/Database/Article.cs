using System;
using System.Collections.Generic;

namespace Thor.Models.Database;

public class Article : IEntity<int>
{
    public Article() { }
    public Article(Dto.Article article)
    {
    }

    public int Id { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string ArticleText { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime ModificationDate { get; set; }
    public bool? HasCommentsEnabled { get; set; }
    public bool? HasDateAuthorEnabled { get; set; }
    public ArticleStatus Status { get; set; }
    public bool IsBlog { get; set; }
    public bool IsPage { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
    public virtual ICollection<Category> Categories { get; set; }
    public virtual ICollection<Tag> Tags { get; set; }
}
