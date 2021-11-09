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

    #region Interface implementation
    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<StatusResponse> CreateArticle(Article article)
    {
      const string sql = @"INSERT INTO `Article`
      (`UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `Status`, `IsBlog`)
      VALUES (@UserId, @Title, @ArticleText, @CreationDate, @ModificationDate, @HasCommentsEnabled, @HasDateAuthorEnabled, @Status, 1)";
      var result = await executer.ExecuteSql(sql, article);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> DeleteArticle()
    {
      const string sql = @"DELETE FROM Article WHERE Status = 'trash' AND IsBlog = 1";
      var result = await executer.ExecuteSql(sql);
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
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
      const string sql = @"SELECT `Article`.`ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`,
            `HasDateAuthorEnabled`, `ArticleCategory`.`CategoryId`, `Category`.`Name`, `Category`.`Description`, `ArticleTag`.`TagId`,
            `Tag`.`Name`, `Tag`.`Description`
            FROM `Article`
            LEFT JOIN `ArticleCategory` ON `Article`.`ArticleId`  = `ArticleCategory`.`ArticleId`
            LEFT JOIN `Category` ON `ArticleCategory`.`CategoryId` = `Category`.`CategoryId`
            LEFT JOIN `ArticleTag` ON `Article`.`ArticleId` = `ArticleTag`.`ArticleId`
            LEFT JOIN `Tag` ON `ArticleTag`.`TagId` = `Tag`.`TagId`
            WHERE Status = 'public' AND IsBlog = 1";

      var result = await executer.ExecuteSql<Article, Category, Tag>(sql, (article, category, tag) =>
      {
        article.Categories.Add(category);
        if(tag is not null) {
          article.Tags.Add(tag);
        }
        return article;
      }, "CategoryId, TagId");

      var mappedResult = result.GroupBy(p => p.ArticleId).Select(g =>
      {
        var first = g.First();
        first.Categories = g.Select(p => p.Categories.FirstOrDefault()).ToList();
        var tags = g.Select(p => p.Tags.FirstOrDefault());
        if(tags.All(p => p is not null)) {
          first.Tags = tags.Distinct(new TagComparer()).ToList();
        }
        return first;
      });

      await MapUserIdToAuthor(mappedResult);
      return mappedResult;
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
      const string sql = @"UPDATE `Article` SET `Title`= @Title, `ArticleText`= @ArticleText, `CreationDate`= @CreationDate, `ModificationDate`= @ModificationDate,
      `HasCommentsEnabled`= @HasCommentsEnabled,`HasDateAuthorEnabled`= @HasDateAuthorEnabled, `Status`= @Status
      WHERE `ArticleId`= @ArticleId AND `IsBlog`= 1 AND `IsPage`= 0";
      article.ModificationDate = DateTime.Now;
      var result = await executer.ExecuteSql(sql, article);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
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