using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorArticleRepository
{
    IQueryable<Article> GetArticles();
    Task<Article> GetArticle(string title);
    Task<Article> GetArticle(int articleId);
    Task UpdateArticle(Article article);
    Task<Article> CreateArticle(Article article);
    Task DeleteArticles(IEnumerable<Article> articles);
    Task AddCategory(Category category, int articleId);
    Task RemoveCategory(Category category, int articleId);
    Task AddTag(Tag tag, int articleId);
    Task RemoveTag(Tag tag, int articleId);
}