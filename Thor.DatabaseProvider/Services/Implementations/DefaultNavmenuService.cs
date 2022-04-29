using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.DatabaseProvider.Extensions;
using Thor.Models.Dto.Responses;
using Microsoft.Extensions.Logging;
using System;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultNavmenuService : IThorNavmenuService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultNavmenuService> logger;

  public DefaultNavmenuService(ThorContext context, ILogger<DefaultNavmenuService> logger)
  {
    this.context = context;
    this.logger = logger;
  }

  public async Task<StatusResponse<DTO.Navmenu>> CreateNavmenu(DTO.Navmenu navmenu)
  {
    var response = new StatusResponse<DTO.Navmenu>() {
      ResponseType = StatusResponseType.Create
    };
    try
    {
      var tracking = await context.Navmenus.AddAsync(new DB.Navmenu(navmenu));
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Navmenu(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creating new Navmenu", ex);
      response.Change = Change.Error;
    }
    return response;

  }


  public async Task<StatusResponse<IEnumerable<DTO.Navmenu>>> DeleteNavmenu(int id)
  {
    var response = new StatusResponse<IEnumerable<DTO.Navmenu>>() {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var entity = await context.Navmenus.Where(n => n.NavmenuId == id).FirstOrDefaultAsync();
      context.Navmenus.Remove(entity);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = await GetNavmenus();
    }
    catch (Exception ex)
    {
      logger.LogError("Error on delting navmenu", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<IEnumerable<DTO.Article>> GetArticles()
  {
    var articles = await context.Articles.Where(a => a.IsPage == true && a.Status.Equals("public")).ToListAsync();
    return articles.ConvertList<DB.Article, DTO.Article>(article => new DTO.Article(article));
  }

  public async Task<IEnumerable<DTO.Category>> GetCategories()
  {
    var categories = await context.Categories.ToListAsync();
    return categories.ConvertList<DB.Category, DTO.Category>(category => new DTO.Category(category));
  }

  public async Task<IEnumerable<DTO.Navmenu>> GetNavmenus()
  {
    var navmenus = await context.Navmenus
      .Include(n => n.ChildNavmenu)
      .OrderBy(n => n.NavmenuOrder)
      .ToListAsync();
    return navmenus.ConvertList<DB.Navmenu, DTO.Navmenu>(navmenu => new DTO.Navmenu(navmenu));
  }

  public async Task<StatusResponse<IEnumerable<DTO.Navmenu>>> ReorderNavmenu(IEnumerable<DTO.Navmenu> navmenus)
  {
    var response = new StatusResponse<IEnumerable<DTO.Navmenu>>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var dbNavmenus = navmenus.ConvertList<DTO.Navmenu, DB.Navmenu>(navmenu => new DB.Navmenu(navmenu));
      context.Navmenus.UpdateRange(dbNavmenus);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = await GetNavmenus();
    }
    catch (Exception ex)
    {
      logger.LogError("Error reordering navmenu", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<StatusResponse<DTO.Navmenu>> UpdateNavmenu(DTO.Navmenu navmenu)
  {
    var response = new StatusResponse<DTO.Navmenu>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var dbnavmneu = new DB.Navmenu(navmenu);
      var tracking = context.Navmenus.Update(dbnavmneu);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Navmenu(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error reordering navmenu", ex);
      response.Change = Change.Error;
    }
    return response;
  }
}