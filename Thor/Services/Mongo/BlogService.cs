using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Mongo 
{
  public class BlogService : IBlogService
  {
    public BlogService() 
    {
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
    }
    public UnderlayingDatabase UnderlayingDatabase { get; }

    public Task<IEnumerable<Article>> GetPublicBlog()
    {
      throw new System.NotImplementedException();
    }

    public Task<Article> GetSinglePublicPost(string title)
    {
      throw new System.NotImplementedException();
    }
  }
}