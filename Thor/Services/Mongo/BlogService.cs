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

    public Task<ChangeResponse> CreateBlogArticle(Article article)
    {
      throw new System.NotImplementedException();
    }

    public Task<ChangeResponse> DeleteBlogArticle()
    {
      throw new System.NotImplementedException();
    }

    public Task<int> GetBlogId(string title)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetFullBlog()
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Article>> GetPublicBlog()
    {
      var query = from b in Collection.AsQueryable() where b.Status == "public" && b.IsBlog == true select b;
      return Task.FromResult<IEnumerable<Article>>(query.ToList());
    }

    public Task<Article> GetSingleArticle(string title)
    {
      throw new System.NotImplementedException();
    }

    public Task<Article> GetSinglePublicArticle(string title)
    {
      var query = from b in Collection.AsQueryable() where b.Title == title && b.IsBlog == true && b.Status == "public" select b;
      return Task.FromResult<Article>(query.FirstOrDefault());
    }

    public Task<ChangeResponse> UpdateBlogArticle(Article update)
    {
      throw new System.NotImplementedException();
    }
  }
}