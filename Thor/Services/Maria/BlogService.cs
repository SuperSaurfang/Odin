using System.Collections.Generic;
using Thor.Models;
using System.Threading.Tasks;
using Thor.Services.Api;
using Thor.Util;
using System;
using System.Linq;
using Thor.Util.ThorSqlBuilder;
using Dapper;
using System.Data;

namespace Thor.Services.Maria
{
  public class BlogService : IBlogService
  {
    private const string SPLIT_ON = "CategoryId, TagId";
    private readonly ISqlExecuterService executer;

    private readonly IRestClientService restClient;

    public BlogService(ISqlExecuterService sqlExecuterService, IRestClientService restClient)
    {
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
      return await executer.ExecuteSqlSingle<int>(sql, new { title = title });
    }

    public async Task<IEnumerable<Article>> GetAllArticles()
    {
      var template = ArtilceSqlBuilder.CreateAllDashboardQuery();
      var result = await executer.ExecuteSql<Article>(template.RawSql);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<IEnumerable<Article>> GetAllPublicArticles()
    {
      var template = ArtilceSqlBuilder.CreateAllPublicQuery();
      var result = await executer.ExecuteSql<Article, Category, Tag>(template.RawSql, ArticleJoinFunc, SPLIT_ON);

      var mappedResult = result.GroupBy(p => p.ArticleId).Select(Selection());

      await MapUserIdToAuthor(mappedResult);
      return mappedResult;


    }

    public async Task<Article> GetArticleByTitle(string title)
    {
      var template = ArtilceSqlBuilder.CreateDashboardQuery();
      var rawResult = await executer.ExecuteSql<Article, Category, Tag>(template.RawSql, ArticleJoinFunc, SPLIT_ON, new { title = title });
      var result = rawResult.GroupBy(p => p.ArticleId).Select(Selection()).FirstOrDefault();
      result.Author = await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<Article> GetPublicArticleByTitle(string title)
    {
      var template = ArtilceSqlBuilder.CreatePublicQuery();
      var rawResult = await executer.ExecuteSql<Article, Category, Tag>(template.RawSql, ArticleJoinFunc, SPLIT_ON, new { title = title });
      var result = rawResult.GroupBy(p => p.ArticleId).Select(Selection()).FirstOrDefault();
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

    public async Task<IEnumerable<Article>> GetCategoryBlog(string category)
    {
      const string sql = "`articlesByCategory`";
      var dynamicParams = new DynamicParameters();
      dynamicParams.Add("catName", category);
      var result = await executer.ExecuteSql<Article, Category, Tag>(sql, ArticleJoinFunc, SPLIT_ON, dynamicParams, CommandType.StoredProcedure);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<StatusResponse> AddCategoryToBlogPost(ArticleCategory articleCategory)
    {
      const string sql = "INSERT INTO `ArticleCategory`(`ArticleId`, `CategoryId`) VALUES (@ArticleId, @CategoryId)";
      var result = await executer.ExecuteSql(sql, articleCategory);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> RemoveCategoryFromBlogPost(ArticleCategory articleCategory)
    {
      const string sql = "DELETE FROM `ArticleCategory` WHERE `ArticleId` = @ArticleId AND `CategoryId` = @CategoryId";
      var result = await executer.ExecuteSql(sql, articleCategory);
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
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

    private Func<IGrouping<int, Article>, Article> Selection()
    {
      return g =>
      {
        var first = g.First();
        first.Categories = g.Select(p => p.Categories.FirstOrDefault()).ToList();
        var tags = g.Select(p => p.Tags.FirstOrDefault());
        if (tags.All(p => p is not null))
        {
          first.Tags = tags.Distinct(new TagComparer()).ToList();
        }
        return first;
      };
    }

    private Func<Article, Category, Tag, Article> ArticleJoinFunc = (article, category, tag) =>
    {
      if (category is not null)
      {
        article.Categories.Add(category);
      }
      if (tag is not null)
      {
        article.Tags.Add(tag);
      }
      return article;
    };
    #endregion
  }
}