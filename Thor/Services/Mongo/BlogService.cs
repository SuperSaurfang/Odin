using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using MongoDB.Driver;
using System.Linq;

namespace Thor.Services.Mongo
{
  public class BlogService : IBlogService
  {
    public BlogService(IMongoConnectionService connectionService)
    {
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
      Collection = connectionService.GetCollection<Article>("article");
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    private IMongoCollection<Article> Collection { get; }

    public Task<StatusResponse> CreateArticle(Article article)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> DeleteArticle()
    {
      throw new System.NotImplementedException();
    }

    public Task<int> GetArticleId(string title)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetAllArticles()
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetAllPublicArticles()
    {
      var query = from b in Collection.AsQueryable() where b.Status == "public" && b.IsBlog == true select b;
      return Task.FromResult<IEnumerable<Article>>(query.ToList());
    }

    public Task<Article> GetArticleByTitle(string title)
    {
      throw new System.NotImplementedException();
    }

    public Task<Article> GetPublicArticleByTitle(string title)
    {
      var query = from b in Collection.AsQueryable() where b.Title == title && b.IsBlog == true && b.Status == "public" select b;
      return Task.FromResult<Article>(query.FirstOrDefault());
    }

    public Task<StatusResponse> UpdateArticle(Article update)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetCategoryBlog(string category)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> AddCategoryToBlogPost(ArticleCategory articleCategory)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> RemoveCategoryFromBlogPost(ArticleCategory articleCategory)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> AddTagToArticle(ArticleTag articleTag)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> RemoveTagFromArticle(ArticleTag articleTag)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetBlogByTag(string tag)
    {
      throw new System.NotImplementedException();
    }
  }
}