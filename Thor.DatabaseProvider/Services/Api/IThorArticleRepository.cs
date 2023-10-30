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
    Task<Article> GetArticle(string title, Func<Article, bool> predicate);
    Task<Article> GetArticle(int articleId);
    Task<StatusResponse<Article>> UpdateArticle(Article article);
    Task<StatusResponse<Article>> CreateArticle(Article article);
    Task<StatusResponse<IEnumerable<Article>>> DeleteArticles(IEnumerable<Article> articles, Func<Article, bool> predicate);
    Task<StatusResponse<Article>> AddCategory(Category category, int articleId);
    Task<StatusResponse<Article>> RemoveCategory(Category category, int articleId);
    Task<StatusResponse<Article>> AddTag(Tag tag, int articleId);
    Task<StatusResponse<Article>> RemoveTag(Tag tag, int articleId);
}