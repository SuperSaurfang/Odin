using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorPublicService {
  Task<ArticleResponse> GetBlog(Paging paging);
  Task<ArticleResponse> GetBlogByCategory(ArticleRequest category);
  Task<ArticleResponse> GetBlogByTag(ArticleRequest tag);
  Task<Article> GetBlogByTitle(string title);
  Task<Article> GetPage(string title);
  Task<IEnumerable<Navmenu>> GetNavMenu();
  Task<StatusResponse<Comment>> CreateComment(Comment comment);
  Task<IEnumerable<Comment>> GetCommentsForArticle(int articleId);
}