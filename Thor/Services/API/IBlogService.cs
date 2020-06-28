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
    Task<Article> GetSinglePublicArticle(string title);
    Task<Article> GetSingleArticle(string title);
    Task<IEnumerable<Article>> GetFullBlog();
    Task<ChangeResponse> UpdateBlogArticle(Article update);
    Task<ChangeResponse> CreateBlogArticle(Article article);
    Task<ChangeResponse> DeleteBlogArticle();
  }
}