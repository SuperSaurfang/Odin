using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface IBlogService : IArticleService {}
  public interface IPageService: IArticleService {}
  public interface IArticleService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Article>> GetAllPublicArticles();
    Task<Article> GetPublicArticleByTitle(string title);
    Task<int> GetArticleId(string title);
    Task<Article> GetArticleByTitle(string title);
    Task<IEnumerable<Article>> GetAllArticles();
    Task<StatusResponse> UpdateArticle(Article article);
    Task<StatusResponse> CreateArticle(Article article);
    Task<StatusResponse> DeleteArticle();
  }
}