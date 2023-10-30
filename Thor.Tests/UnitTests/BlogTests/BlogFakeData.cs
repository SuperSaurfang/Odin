using Thor.Models.Database;

namespace Thor.Tests.UnitTests.BlogTests;

public class BlogFakeData
{
  public BlogFakeData()
  {
    Articles = new List<Article>() {
      new Article() {
        Id = 1,
        ArticleText = "Text 1",
        Title = "Title 1",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Draft,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        Id = 2,
        ArticleText = "Text 2",
        Title = "Title 2",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Draft,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        Id = 3,
        ArticleText = "Text 3",
        Title = "Title 3",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Private,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        Id = 4,
        ArticleText = "Text 4",
        Title = "Title 4",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Public,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        Id = 6,
        ArticleText = "Text 6",
        Title = "Title 6",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Trash,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      },
      new Article() {
        Id = 7,
        ArticleText = "Text 7",
        Title = "Title 7",
        CreationDate = DateTime.Now,
        ModificationDate = DateTime.Now,
        IsBlog = true,
        Status = ArticleStatus.Trash,
        HasCommentsEnabled = true,
        HasDateAuthorEnabled = true,
        IsPage = false,
        UserId = "Test User"
      }
    }.AsQueryable();
  }
  public IQueryable<Article> Articles { get; }


}