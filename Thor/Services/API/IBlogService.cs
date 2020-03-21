using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface IBlogService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Article>> GetPublicBlog();
    Task<Article> GetSinglePublicPost(string title);
  }
}