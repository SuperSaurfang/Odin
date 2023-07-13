using Thor.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace Thor.Tests.UnitTests.BlogTests;

public class BlogFakeData
{
  public BlogFakeData()
  {
    Articles = new List<Article>() {
      new Article() {
        ArticleId = 1,
        ArticleText = "Text 1",
        Title = "Title 1",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "draft",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        ArticleId = 2,
        ArticleText = "Text 2",
        Title = "Title 2",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "draft",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        ArticleId = 3,
        ArticleText = "Text 3",
        Title = "Title 3",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "private",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        ArticleId = 4,
        ArticleText = "Text 4",
        Title = "Title 4",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "public",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        ArticleId = 6,
        ArticleText = "Text 6",
        Title = "Title 6",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "trash",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        ArticleId = 7,
        ArticleText = "Text 7",
        Title = "Title 7",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = "trash",
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      }
    }.AsQueryable();
  }
  public IQueryable<Article> Articles { get; }


}