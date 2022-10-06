using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorBlogService
{
  Task<IEnumerable<Article>> GetArticles();
  Task<Article> GetArticle(string title);
  Task<StatusResponse<Article>> UpdateArticle(Article article);
  Task<StatusResponse<Article>> CreateArticle(Article article);
  Task<StatusResponse<IEnumerable<Article>>> DeleteArticles();
  Task<StatusResponse<ArticleCategory>> AddCategory(ArticleCategory articleCategory);
  Task<StatusResponse<IEnumerable<ArticleCategory>>> RemoveCategory(ArticleCategory articleCategory);
  Task<StatusResponse<ArticleTag>> AddTag(ArticleTag articleTag);
  Task<StatusResponse<IEnumerable<ArticleTag>>> RemoveTag(ArticleTag articleTag);
}