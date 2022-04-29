using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorPublicService {
  Task<IEnumerable<Article>> GetBlog();
  Task<IEnumerable<Article>> GetBlogByCategory(string category);
  Task<IEnumerable<Article>> GetBlogByTag(string tag);
  Task<Article> GetBlogByTitle(string title);
  Task<Article> GetPage(string title);
  Task<IEnumerable<Navmenu>> GetNavMenu();
  Task CreateComment(Comment comment);
  Task<IEnumerable<Comment>> GetCommentsForArticle(int articleId);
}