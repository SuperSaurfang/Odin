using System.Collections.Generic;
using Thor.Models;
using System.Threading.Tasks;
using Thor.Services.Api;
using Thor.Util;
using System;

namespace Thor.Services.Maria
{
  public class BlogService: IBlogService {

    private readonly ISqlExecuterService executer;

    public BlogService(ISqlExecuterService sqlExecuterService) {
      executer = sqlExecuterService;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<ChangeResponse> CreateArticle(Article article)
    {
      const string sql = @"INSERT INTO `Article`
      (`UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`, `IsBlog`)
      VALUES (@UserId, @Title, @ArticleText, @CreationDate, @ModificationDate, @HasCommentsEnabled, @HasDateAuthorEnabled, @Status, 1)";
      var response = await executer.ExecuteSql(sql, article);
      return await ProcessResponse(response);
    }

    public async Task<ChangeResponse> DeleteArticle()
    {
      const string sql = @"DELETE FROM Article WHERE Status = 'trash' AND IsBlog = 1";
      var response = await executer.ExecuteSql(sql);
      return await ProcessResponse(response);
    }

    public async Task<int> GetArticleId(string title)
    {
      const string sql = @"SELECT `ArticleId` FROM Article WHERE IsBlog = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<int>(sql, new {title = title});
    }

    public async Task<IEnumerable<Article>> GetAllArticles()
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article, User WHERE Article.UserId = User.UserId AND IsBlog = 1";
      return await executer.ExecuteSql<Article>(sql);
    }

    public async Task<IEnumerable<Article>> GetAllPublicArticles()
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`
      FROM Article, User WHERE Article.UserId = User.UserId AND Status = 'public' AND IsBlog = 1";
      return await executer.ExecuteSql<Article>(sql);
    }

    public async Task<Article> GetArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article, User WHERE Article.UserId = User.UserId AND IsBlog = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<Article>(sql, new {title = title});
    }

    public async Task<Article> GetPublicArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`
      FROM Article, User WHERE Article.UserId = User.UserId AND Status = 'public' AND IsBlog = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<Article>(sql, new {title = title});
    }

    public async Task<ChangeResponse> UpdateArticle(Article article)
    {

      const string sql = @"UPDATE `Article` SET `Title`= @Title,`ArticleText`= @ArticleText, `CreationDate` = @CreationDate, `ModificationDate`= @ModificationDate,
      `HasCommentsEnabled`= @HasCommentsEnabled,`HasDateAuthorEnabled`= @HasDateAuthorEnabled, `Status`= @Status
      WHERE `ArticleId` = @ArticleId AND `IsBlog`= 1 AND `IsPage`= 0";
      article.ModificationDate = DateTime.Now;
      var result = await executer.ExecuteSql(sql, article);
      return await ProcessResponse(result);
    }

    private async Task<ChangeResponse> ProcessResponse(int response)
    {
      if (response >= 1)
      {
        return await Task.FromResult(ChangeResponse.Change);
      }
      else if (response == 0)
      {
        return await Task.FromResult(ChangeResponse.NoChange);
      }
      return await Task.FromResult(ChangeResponse.Error);
    }
  }
}