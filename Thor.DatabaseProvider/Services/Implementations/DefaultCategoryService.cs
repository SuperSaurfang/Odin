using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.Models.Dto.Responses;
using Microsoft.Extensions.Logging;
using System;
using Thor.DatabaseProvider.Extensions;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultCategoryService : IThorCategoryService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultCategoryService> logger;

  public DefaultCategoryService(ThorContext context, ILogger<DefaultCategoryService> logger)
  {
    this.context = context;
    this.logger = logger;
  }

  public async Task<StatusResponse<DTO.Category>> CreateCategory(DTO.Category category)
  {
    var response = new StatusResponse<DTO.Category>() {
      ResponseType = StatusResponseType.Create
    };
    try
    {
      var dbCategory = new DB.Category(category);
      var tracking = await context.Categories.AddAsync(dbCategory);
      await context.SaveChangesAsync();
      response.Model = new DTO.Category(tracking.Entity);
      response.Change = Change.Change;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creating new category", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<StatusResponse<IEnumerable<DTO.Category>>> DeleteCategory(int id)
  {
    var response = new StatusResponse<IEnumerable<DTO.Category>>() {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var entity = await context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();
      context.Categories.Remove(entity);
      await context.SaveChangesAsync();
      response.Model = await GetCategories();
      response.Change = Change.Change;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on deleting category", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<IEnumerable<DTO.Category>> GetCategories()
  {
    var categories = await context.Categories
      .Include(c => c.Articles)
      .ToListAsync();
    return categories.ConvertList<DB.Category, DTO.Category>(category => new DTO.Category(category));
  }

  public async Task<StatusResponse<DTO.Category>> UpdateCategory(DTO.Category category)
  {
    var response = new StatusResponse<DTO.Category>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var dbCategory = new DB.Category(category);
      var tracking = context.Categories.Update(dbCategory);
      await context.SaveChangesAsync();
      response.Model = new DTO.Category(tracking.Entity);
      response.Change = Change.Change;
    }
    catch (Exception ex)
    {
      logger.LogError("Error on updating category", ex);
      response.Change = Change.Error;
    }
    return response;
  }
}