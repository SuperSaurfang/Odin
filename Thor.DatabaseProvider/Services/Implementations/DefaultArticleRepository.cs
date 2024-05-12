using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Database;
using Microsoft.Extensions.Logging;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultArticleRepository : IThorArticleRepository
{
    private readonly ThorContext context;
    private readonly ILogger<DefaultArticleRepository> logger;

    public DefaultArticleRepository(ThorContext context, ILogger<DefaultArticleRepository> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public async Task<Article> CreateArticle(Article article)
    {
        context.Articles.Add(article);
        await context.SaveChangesAsync();
        return article;
    }

    public async Task<IEnumerable<Article>> DeleteBlogArticles(IEnumerable<Article> articles)
    {
        var trash = articles.Where(a => a.Status == ArticleStatus.Trash && a.IsBlog);
        context.Articles.RemoveRange(trash);
        await context.SaveChangesAsync();
        articles = GetArticles();
        return articles.Where(a => a.IsBlog);
    }

    public async Task<IEnumerable<Article>> DeletePageArticles(IEnumerable<Article> articles) 
    {
        var trash = articles.Where(a => a.Status == ArticleStatus.Trash && a.IsPage);
        context.Articles.RemoveRange(trash);
        await context.SaveChangesAsync();
        articles = GetArticles();
        return articles.Where(a => a.IsPage);
    }

    public async Task<Article> GetBlogArticle(string title)
    {
        return await context.Articles
          .Include(a => a.Categories)
          .Include(a => a.Tags)
          .Where(a => string.Equals(a.Title, title) && a.IsBlog)
          .FirstOrDefaultAsync();
    }

    public async Task<Article> GetPageArticle(string title)
    {
        return await context.Articles
          .Include(a => a.Categories)
          .Include(a => a.Tags)
          .Where(a => string.Equals(a.Title, title) && a.IsPage)
          .FirstOrDefaultAsync();
    }

    public async Task<Article> GetArticle(int articleId)
    {
        return await context.Articles
            .Include(a => a.Categories)
            .Include(a => a.Tags)
            .Where(a => a.Id == articleId)
            .FirstOrDefaultAsync();
    }

    public IQueryable<Article> GetArticles()
    {
        return context.Articles.AsQueryable();
    }

    public async Task<Article> RemoveCategory(Category category, int articleId)
    {
        var article = context.Articles
            .Where(a => a.Id == articleId)
            .Include(a => a.Categories)
            .FirstOrDefault();

        article.Categories.Remove(category);
        await context.SaveChangesAsync();
        return article;
    }

    public async Task<Article> AddCategory(Category category, int articleId)
    {
        var article = await context.Articles
            .Where(a => a.Id == articleId)
            .FirstOrDefaultAsync();
        article.Categories ??= [];
        article.Categories.Add(category);
        await context.SaveChangesAsync();
        return article;
    }

    public async Task<Article> AddTag(Tag tag, int articleId)
    {
        var article = await context.Articles
            .Where(a => a.Id == articleId)
            .FirstOrDefaultAsync();

        article.Tags.Add(tag);
        await context.SaveChangesAsync();
        return article;
    }

    public async Task<Article> RemoveTag(Tag tag, int articleId)
    {
        var article = await context.Articles
            .Where(a => a.Id == articleId)
            .FirstOrDefaultAsync();

        article.Tags.Remove(tag);
        await context.SaveChangesAsync();
        return article;
    }

    public async Task<Article> UpdateArticle(Article article)
    {
        context.Articles.Update(article);
        await context.SaveChangesAsync();
        return article;
    }
}