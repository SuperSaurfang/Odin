using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.DatabaseProvider.Util;
using Thor.Models.Dto.Responses;
using Microsoft.Extensions.Logging;
using System;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultBlogService : IThorBlogService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultBlogService> logger;

  public DefaultBlogService(ThorContext context, ILogger<DefaultBlogService> logger)
  {
    this.context = context;
    this.logger = logger;
  }


  public async Task<StatusResponse<DTO.Article>> CreateArticle(DTO.Article article)
  {
    var response = new StatusResponse<DTO.Article>()
    {
      ResponseType = StatusResponseType.Create
    };
    DB.Article dbArticle = ConvertArticle(article);
    try
    {
      var result = await context.Articles.AddAsync(dbArticle);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Article(result.Entity);
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creatinf new blog article:", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  public async Task<StatusResponse<IEnumerable<DTO.Article>>> DeleteArticles()
  {
    var response = new StatusResponse<IEnumerable<DTO.Article>>()
    {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var trash = await context.Articles
        .Where(a => a.IsBlog == true && a.Status.Equals("trash"))
        .ToListAsync();
      context.Articles.RemoveRange(trash);
      await context.SaveChangesAsync();
      response.Model = await GetArticles();
      response.Change = Change.Change;
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on deleting trash: ", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  public async Task<DTO.Article> GetArticle(string title)
  {
    var article = await context.Articles
      .Include(a => a.Categories)
      .Include(a => a.Tags)
      .Where(a => a.IsBlog == true && a.Title.Equals(title))
      .FirstOrDefaultAsync();
    return new DTO.Article(article);
  }

  public async Task<IEnumerable<DTO.Article>> GetArticles()
  {
    var articles = await context.Articles
      .Where(a => a.IsBlog == true)
      .ToListAsync();

    return Utils.ConvertToDto<DB.Article, DTO.Article>(articles, article => new DTO.Article(article));
  }

  public async Task<StatusResponse<IEnumerable<DTO.ArticleCategory>>> RemoveCategory(DTO.ArticleCategory articleCategory)
  {
    var response = new StatusResponse<IEnumerable<DTO.ArticleCategory>>()
    {
      ResponseType = StatusResponseType.Delete
    };
    var dbSet = context.Set<DB.ArticleCategory>(nameof(DB.ArticleCategory));
    try
    {
      var result = dbSet.Remove(new DB.ArticleCategory(articleCategory));
      await context.SaveChangesAsync();
      var entities = await dbSet
        .Where(c => c.ArticleId == articleCategory.ArticleId)
        .ToListAsync();
      response.Change = Change.Change;
      response.Model = Utils.ConvertToDto<DB.ArticleCategory, DTO.ArticleCategory>(entities, articleCategory => new DTO.ArticleCategory(articleCategory));
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on removing category from article: ", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  public async Task<StatusResponse<DTO.ArticleCategory>> AddCategory(DTO.ArticleCategory articleCategory)
  {
    var response = new StatusResponse<DTO.ArticleCategory>()
    {
      ResponseType = StatusResponseType.Create
    };
    var dbSet = context.Set<DB.ArticleCategory>(nameof(DB.ArticleCategory));
    try
    {
      await dbSet.AddAsync(new DB.ArticleCategory(articleCategory));
      await context.SaveChangesAsync();
      var entity = await dbSet
        .Where(c => c.ArticleId == articleCategory.ArticleId && c.CategoryId == articleCategory.CategoryId)
        .FirstOrDefaultAsync();
      response.Change = Change.Change;
      response.Model = new DTO.ArticleCategory(entity);
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on add category to article: ", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  public async Task<StatusResponse<DTO.ArticleTag>> AddTag(DTO.ArticleTag articleTag)
  {
    var response = new StatusResponse<DTO.ArticleTag>()
    {
      ResponseType = StatusResponseType.Create
    };
    var dbSet = context.Set<DB.ArticleTag>(nameof(DB.ArticleTag));
    try
    {
      await dbSet.AddAsync(new DB.ArticleTag(articleTag));
      await context.SaveChangesAsync();
      var entity = await dbSet
        .Where(c => c.ArticleId == articleTag.ArticleId && c.TagId == articleTag.TagId)
        .FirstOrDefaultAsync();
      response.Change = Change.Change;
      response.Model = new DTO.ArticleTag(entity);
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on add tag to article: ", ex);
      response.Change = Change.Error;
      return response;
    }

  }

  public async Task<StatusResponse<IEnumerable<DTO.ArticleTag>>> RemoveTag(DTO.ArticleTag articleTag)
  {
    var response = new StatusResponse<IEnumerable<DTO.ArticleTag>>()
    {
      ResponseType = StatusResponseType.Delete
    };
    var dbSet = context.Set<DB.ArticleTag>(nameof(DB.ArticleTag));
    try
    {
      dbSet.Remove(new DB.ArticleTag(articleTag));
      await context.SaveChangesAsync();
      var entities = await dbSet
        .Where(c => c.ArticleId == articleTag.ArticleId)
        .ToListAsync();
      response.Change = Change.Change;
      response.Model = Utils.ConvertToDto<DB.ArticleTag, DTO.ArticleTag>(entities, articleTag => new DTO.ArticleTag(articleTag));
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on remove tag from article: ", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  public async Task<StatusResponse<DTO.Article>> UpdateArticle(DTO.Article article)
  {
    var response = new StatusResponse<DTO.Article>()
    {
      ResponseType = StatusResponseType.Update
    };
    var dbArticle = ConvertArticle(article);
    try
    {
      var change = context.Articles.Update(dbArticle);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Article(change.Entity);
      return response;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on updating artcile: ", ex);
      response.Change = Change.Error;
      return response;
    }
  }

  private static DB.Article ConvertArticle(DTO.Article article)
  {
    return new DB.Article(article)
    {
      IsBlog = true,
      IsPage = false
    };
  }
}