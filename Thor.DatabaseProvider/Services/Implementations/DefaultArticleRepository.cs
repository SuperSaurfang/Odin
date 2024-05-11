using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Database;
using Microsoft.Extensions.Logging;
using System;
using Thor.Models.Dto.Responses;
using Org.BouncyCastle.Crypto.Engines;

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

    public async Task<StatusResponse<Article>> CreateArticle(Article article)
    {
        var statusResponse = StatusResponse<Article>.CreateResponse();
        try
        {
            context.Articles.Add(article);
            await context.SaveChangesAsync();
            statusResponse.Change = Change.Change;
            statusResponse.Model = article;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on creating new blog article:");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<IEnumerable<Article>>> DeleteBlogArticles(IEnumerable<Article> articles)
    {
        var statusResponse = StatusResponse<IEnumerable<Article>>.DeleteResponse();
        try
        {
            var trash = articles.Where(a => a.Status == ArticleStatus.Trash && a.IsBlog);
            context.Articles.RemoveRange(trash);
            await context.SaveChangesAsync();
            articles = GetArticles();
            statusResponse.Change = Change.Change;
            statusResponse.Model = articles.Where(a => a.IsBlog);
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on deleting trash: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<IEnumerable<Article>>> DeletePageArticles(IEnumerable<Article> articles) 
    {
        var statusResponse = StatusResponse<IEnumerable<Article>>.DeleteResponse();
        try
        {
            var trash = articles.Where(a => a.Status == ArticleStatus.Trash && a.IsPage);
            context.Articles.RemoveRange(trash);
            await context.SaveChangesAsync();
            articles = GetArticles();
            statusResponse.Change = Change.Change;
            statusResponse.Model = articles.Where(a => a.IsPage);
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on deleting trash: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
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

    public async Task<StatusResponse<Article>> RemoveCategory(Category category, int articleId)
    {
        var statusResponse = StatusResponse<Article>.UpdateResponse();
        try
        {
            var article = context.Articles
              .Where(a => a.Id == articleId)
                .Include(a => a.Categories)
              .FirstOrDefault();

            article.Categories.Remove(category);
            await context.SaveChangesAsync();
            statusResponse.Change = Change.Change;
            statusResponse.Model = article;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on removing category from article: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<Article>> AddCategory(Category category, int articleId)
    {
        var statusResponse = StatusResponse<Article>.UpdateResponse();
        try
        {
            var article = await context.Articles
              .Where(a => a.Id == articleId)
              .FirstOrDefaultAsync();

            article.Categories.Add(category);
            await context.SaveChangesAsync();
            statusResponse.Change = Change.Change;
            statusResponse.Model = article;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on add category to article: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<Article>> AddTag(Tag tag, int articleId)
    {
        var statusResponse = StatusResponse<Article>.UpdateResponse();
        try
        {
            var article = await context.Articles
                .Where(a => a.Id == articleId)
                .FirstOrDefaultAsync();

            article.Tags.Add(tag);
            await context.SaveChangesAsync();
            statusResponse.Change = Change.Change;
            statusResponse.Model = article;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on add tag to article: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<Article>> RemoveTag(Tag tag, int articleId)
    {
        var statusResponse = StatusResponse<Article>.UpdateResponse();
        try
        {
            var article = await context.Articles
                .Where(a => a.Id == articleId)
                .FirstOrDefaultAsync();

            article.Tags.Remove(tag);
            await context.SaveChangesAsync();
            statusResponse.Change = Change.Change;
            statusResponse.Model = article;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on remove tag from article: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }

    public async Task<StatusResponse<Article>> UpdateArticle(Article article)
    {
        var statusResponse = StatusResponse<Article>.UpdateResponse();
        try
        {
            context.Articles.Update(article);
            await context.SaveChangesAsync();
            statusResponse.Model = article;
            statusResponse.Change = Change.Change;
            return statusResponse;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error on updating artcile: ");
            statusResponse.Change = Change.Error;
            return statusResponse;
        }
    }
}