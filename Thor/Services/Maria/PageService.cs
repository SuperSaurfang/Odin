using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using System;

namespace Thor.Services.Maria
{

  public class PageService : ArticleServiceBase, IPageService
  {
    private readonly ISqlExecuterService executer;


    public PageService(ISqlExecuterService executer, IRestClientService restClient)
      : base(restClient)
    {
      this.executer = executer;
      this.UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    #region Interface implementation
    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<StatusResponse> CreateArticle(Article article)
    {
      const string sql = @"INSERT INTO `Article`
      (`UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `Status`, `IsPage`)
      VALUES (@UserId, @Title, @ArticleText, @CreationDate, @ModificationDate, @HasCommentsEnabled, @Status, 1)";
      var result = await executer.ExecuteSql(sql, article);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> DeleteArticle()
    {
      const string sql = @"DELETE FROM Article WHERE Status = 'trash' AND IsPage = 1";
      var result = await executer.ExecuteSql(sql);
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
    }

    public async Task<IEnumerable<Article>> GetAllArticles()
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article WHERE IsPage = 1";
      var result = await executer.ExecuteSql<Article>(sql);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<int> GetArticleId(string title)
    {
      const string sql = @"SELECT `ArticleId` FROM Article WHERE IsPage = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<int>(sql, new { title = title });
    }

    // one article per page, a public list of page is not supported at the moment
    public Task<IEnumerable<Article>> GetAllPublicArticles()
    {
      throw new System.NotSupportedException("One article per page, a public list of page is not supported at the moment");
    }

    public async Task<Article> GetArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`
      FROM Article WHERE IsPage = 1 AND Title = @title";
      var result = await executer.ExecuteSqlSingle<Article>(sql, new { title = title });
      result.Author = await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<Article> GetPublicArticleByTitle(string title)
    {
      const string sql = @"SELECT `ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`
      FROM Article WHERE Status = 'public' AND IsPage = 1 AND Title = @title";
      var result = await executer.ExecuteSqlSingle<Article>(sql, new { title = title });
      result.Author = await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<StatusResponse> UpdateArticle(Article article)
    {
      const string sql = @"UPDATE `Article` SET `Title`= @Title,`ArticleText`= @ArticleText, `CreationDate` = @CreationDate, `ModificationDate`= @ModificationDate,
      `HasCommentsEnabled`= @HasCommentsEnabled, `Status`= @Status
      WHERE `ArticleId` = @ArticleId AND `IsBlog`= 0 AND `IsPage`= 1";
      article.ModificationDate = DateTime.Now;
      var result = await executer.ExecuteSql(sql, article);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
    }
    #endregion
  }
}