using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorBlogService
{
  Task<IEnumerable<Article>> GetArticles();
  Task<Article> GetArticle(string title);
  Task UpdateArticle(Article article);
  Task<Article> CreateArticle(Article article);
  Task DeleteArticles();
  Task AddCategory(ArticleCategory articleCategory);
  Task RemoveCategory(ArticleCategory articleCategory);
  Task AddTag(ArticleTag articleTag);
  Task RemoveTag(ArticleTag articleTag);
}