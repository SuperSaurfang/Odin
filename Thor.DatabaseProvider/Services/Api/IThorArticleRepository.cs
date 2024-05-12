using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Thor.Models.Database;
using Thor.Models.Dto.Responses;
using System;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorArticleRepository
{
    IQueryable<Article> GetArticles();
    Task<Article> GetPageArticle(string title);
    Task<Article> GetBlogArticle(string title);
    Task<Article> GetArticle(int articleId);
    Task<Article> UpdateArticle(Article article);
    Task<Article> CreateArticle(Article article);
    Task<IEnumerable<Article>> DeleteBlogArticles(IEnumerable<Article> articles);
    Task<IEnumerable<Article>> DeletePageArticles(IEnumerable<Article> articles);
    Task<Article> AddCategory(Category category, int articleId);
    Task<Article> RemoveCategory(Category category, int articleId);
    Task<Article> AddTag(Tag tag, int articleId);
    Task<Article> RemoveTag(Tag tag, int articleId);
}