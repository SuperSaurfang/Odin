using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Database;
using Microsoft.Extensions.Logging;
using System;

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
        try
        {
            context.Articles.Add(article);
            await context.SaveChangesAsync();
            return article;
        }
        catch (Exception ex)
        {
            logger.LogError("Error on creating new blog article:", ex);
            return null;
        }
    }

    public async Task DeleteArticles(IEnumerable<Article> articles)
    {
        try
        {
            var trash = articles.Where(a => a.Status == ArticleStatus.Trash);
            context.Articles.RemoveRange(trash);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on deleting trash: ", ex);
        }
    }

    public async Task<Article> GetArticle(string title)
    {
        return await context.Articles
          .Include(a => a.Categories)
          .Include(a => a.Tags)
          .Where(a => a.Title.Equals(title))
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

    public async Task RemoveCategory(Category category, int articleId)
    {
        try
        {
            var article = context.Articles
              .Where(a => a.Id == articleId)
                .Include(a => a.Categories)
              .FirstOrDefault();

            article.Categories.Remove(category);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on removing category from article: ", ex);
        }
    }

    public async Task AddCategory(Category category, int articleId)
    {
        try
        {
            var article = await context.Articles
              .Where(a => a.Id == articleId)
              .FirstOrDefaultAsync();

            article.Categories.Add(category);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on add category to article: ", ex);
        }
    }

    public async Task AddTag(Tag tag, int articleId)
    {
        try
        {
            var article = await context.Articles
                .Where(a => a.Id == articleId)
                .FirstOrDefaultAsync();

            article.Tags.Add(tag);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on add tag to article: ", ex);
        }

    }

    public async Task RemoveTag(Tag tag, int articleId)
    {
        try
        {
            var article = await context.Articles
                .Where(a => a.Id == articleId)
                .FirstOrDefaultAsync();

            article.Tags.Remove(tag);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on remove tag from article: ", ex);
        }
    }

    public async Task UpdateArticle(Article article)
    {
        try
        {
            context.Articles.Update(article);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on updating artcile: ", ex);
        }
    }
}