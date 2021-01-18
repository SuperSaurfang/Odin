using System.Collections.Generic;
using Thor.Models;
using System.Threading.Tasks;
using Thor.Services.Api;
using Thor.Util;
using System;
using System.Linq;

namespace Thor.Services.Maria
{
  public class BlogService: IBlogService {

    private readonly ISqlExecuterService executer;

    private readonly IRestClientService restClient;

    public BlogService(ISqlExecuterService sqlExecuterService, IRestClientService restClient) {
      executer = sqlExecuterService;
      this.restClient = restClient;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    #region Interface implementation
    public async Task<StatusResponse> CreateArticle(Article article)
    {
      const string sql = @"INSERT INTO `Article`
      (`UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`, `IsBlog`)
      VALUES (@UserId, @Title, @ArticleText, @CreationDate, @ModificationDate, @HasCommentsEnabled, @HasDateAuthorEnabled, @Status, 1)";
      var result = await executer.ExecuteSql(sql, article);
      if (result == 0)
      {
        return Utils.CreateStatusResponse(result, "No entry created");
      }
      return Utils.CreateStatusResponse(result, $"{result} entr{(result == 1 ? "y" : "ies")} created");
    }

    public async Task<StatusResponse> DeleteArticle()
    {
      const string sql = @"DELETE FROM Article WHERE Status = 'trash' AND IsBlog = 1";
      var result = await executer.ExecuteSql(sql);
      if (result == 0)
      {
        return Utils.CreateStatusResponse(result, "No entry deleted");
      }
      return Utils.CreateStatusResponse(result, $"{result} entr{(result == 1 ? "y" : "ies")} deleted");
    }

    public async Task<int> GetArticleId(string title)
    {
      const string sql = @"SELECT `ArticleId` FROM Article WHERE IsBlog = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<int>(sql, new {title = title});
    }

    public async Task<IEnumerable<Article>> GetAllArticles()
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article WHERE  IsBlog = 1";
      var result = await executer.ExecuteSql<Article>(sql);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<IEnumerable<Article>> GetAllPublicArticles()
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`
      FROM Article WHERE Status = 'public' AND IsBlog = 1";
      var result = await executer.ExecuteSql<Article>(sql);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<Article> GetArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article WHERE IsBlog = 1 AND Title = @title";
      var result = await executer.ExecuteSqlSingle<Article>(sql, new { title = title });
      result.Author = await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<Article> GetPublicArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`
      FROM Article WHERE Status = 'public' AND IsBlog = 1 AND Title = @title";
      var result = await executer.ExecuteSqlSingle<Article>(sql, new {title = title});
      result.Author = await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<StatusResponse> UpdateArticle(Article article)
    {

      const string sql = @"UPDATE `Article` SET `Title`=@Title, `ArticleText`=@ArticleText, `CreationDate`=@CreationDate, `ModificationDate`=@ModificationDate,
      `HasCommentsEnabled`=@HasCommentsEnabled,`HasDateAuthorEnabled`=@HasDateAuthorEnabled, `Status`=@Status
      WHERE `ArticleId`=@ArticleId AND `IsBlog`= 1 AND `IsPage`= 0";
      article.ModificationDate = DateTime.Now;
      var result = await executer.ExecuteSql(sql, article);
      if (result == 0)
      {
        return Utils.CreateStatusResponse(result, "No entry updated");
      }
      return Utils.CreateStatusResponse(result, $"{result} entr{(result == 1 ? "y" : "ies")} updated");
    }
    #endregion

    #region  Private Helpers
    private async Task MapUserIdToAuthor(IEnumerable<Article> result)
    {
      var nickNames = await restClient.GetUserNicknames();
      var query = nickNames.AsQueryable();

      foreach (var item in result)
      {
        item.Author = (from name in query where name.UserId.Equals(item.UserId) select name.Nickname).FirstOrDefault();
      }
    }
    private async Task<string> MapUserIdToAuthor(Article result)
    {
      var nicknames = await restClient.GetUserNicknames();
      var query = nicknames.AsQueryable();
      return (from name in query where name.UserId.Equals(result.UserId) select name.Nickname).FirstOrDefault();
    }
    #endregion
  }
}