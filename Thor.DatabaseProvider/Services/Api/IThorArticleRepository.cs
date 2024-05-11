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
    Task<StatusResponse<Article>> UpdateArticle(Article article);
    Task<StatusResponse<Article>> CreateArticle(Article article);
    Task<StatusResponse<IEnumerable<Article>>> DeleteBlogArticles(IEnumerable<Article> articles);
    Task<StatusResponse<IEnumerable<Article>>> DeletePageArticles(IEnumerable<Article> articles);
    Task<StatusResponse<Article>> AddCategory(Category category, int articleId);
    Task<StatusResponse<Article>> RemoveCategory(Category category, int articleId);
    Task<StatusResponse<Article>> AddTag(Tag tag, int articleId);
    Task<StatusResponse<Article>> RemoveTag(Tag tag, int articleId);
}