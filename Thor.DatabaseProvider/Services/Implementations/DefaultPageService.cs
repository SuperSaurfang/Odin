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
using System;
using Microsoft.Extensions.Logging;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultPageService : IThorPageService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultPageService> logger;

  public DefaultPageService(ThorContext context, ILogger<DefaultPageService> logger)
  {
    this.context = context;
    this.logger = logger;
  }

  public async Task<StatusResponse<DTO.Article>> CreatePage(DTO.Article page)
  {
    var response = new StatusResponse<DTO.Article>() {
      ResponseType = StatusResponseType.Create
    };
    try
    {
      DB.Article dbPage = ConvertArticle(page);
      var tracking = await context.Articles.AddAsync(dbPage);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Article(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creating new page", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<StatusResponse<IEnumerable<DTO.Article>>> DeletePages()
  {
    var response = new StatusResponse<IEnumerable<DTO.Article>>() {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var trash = await context.Articles
        .Where(a => a.IsPage == true && a.Status.Equals("trash"))
        .ToListAsync();
      context.Articles.RemoveRange(trash);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = await GetPages();
    }
    catch (Exception ex)
    {
      logger.LogError("Error on deleting pages", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<DTO.Article> GetPage(string title)
  {
    var page = await context.Articles
      .Where(a => a.IsPage == true && a.Title.Equals(title))
      .FirstOrDefaultAsync();

    return new DTO.Article(page);
  }

  public async Task<IEnumerable<DTO.Article>> GetPages()
  {
    var pages = await context.Articles
      .Where(a => a.IsPage == true)
      .ToListAsync();
    return Utils.ConvertToDto<DB.Article, DTO.Article>(pages, page => new DTO.Article(page));
  }

  public async Task<StatusResponse<DTO.Article>> UpdatePage(DTO.Article page)
  {
    var response = new StatusResponse<DTO.Article>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var dbPage = ConvertArticle(page);
      var tracking = context.Articles.Update(dbPage);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Article(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on updating the page", ex);
      response.Change = Change.Error;
    }
    return response;

  }

  public async Task<StatusResponse<DTO.ArticleTag>> AddTag(DTO.ArticleTag articleTag)
  {
    var response = new StatusResponse<DTO.ArticleTag>() {
      ResponseType = StatusResponseType.Create
    };
    var dbSet = context.Set<DB.ArticleTag>(nameof(DB.ArticleTag));
    try
    {
      await dbSet.AddAsync(new DB.ArticleTag(articleTag));
      await context.SaveChangesAsync();
      var entity = await dbSet
        .Where(a => a.TagId == articleTag.TagId && a.ArticleId == articleTag.ArticleId)
        .FirstOrDefaultAsync();
      response.Change = Change.Change;
      response.Model = new DTO.ArticleTag(entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on adding tag from page", ex);
      response.Change = Change.Error;
    }
    return response;

  }

  public async Task<StatusResponse<IEnumerable<DTO.ArticleTag>>> RemoveTag(DTO.ArticleTag articleTag)
  {
    var response = new StatusResponse<IEnumerable<DTO.ArticleTag>>() {
      ResponseType = StatusResponseType.Delete
    };
    var dbSet = context.Set<DB.ArticleTag>(nameof(DB.ArticleTag));
    try
    {
      dbSet.Remove(new DB.ArticleTag(articleTag));
      await context.SaveChangesAsync();
      var entities = await dbSet
        .Where(a => a.ArticleId == articleTag.ArticleId)
        .ToListAsync();
      response.Change = Change.Change;
      response.Model = Utils.ConvertToDto<DB.ArticleTag, DTO.ArticleTag>(entities, entity => new DTO.ArticleTag(entity));
    }
    catch (Exception ex)
    {
      logger.LogError("Error on removing tag from page", ex);
      response.Change = Change.Error;
    }
    return response;

  }

  private static DB.Article ConvertArticle(DTO.Article page)
  {
    return new DB.Article(page)
    {
      IsBlog = false,
      IsPage = true,
    };
  }
}
