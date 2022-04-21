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

internal class DefaultTagService : IThorTagService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultTagService> logger;

  public DefaultTagService(ThorContext context, ILogger<DefaultTagService> logger)
  {
    this.context = context;
    this.logger = logger;
  }

  public async Task<StatusResponse<DTO.Tag>> CreateTag(DTO.Tag tag)
  {
    var response = new StatusResponse<DTO.Tag>() {
      ResponseType = StatusResponseType.Create
    };
    try
    {
      var tracking = await context.Tags.AddAsync(new DB.Tag(tag));
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Tag(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creating new tag", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<StatusResponse<IEnumerable<DTO.Tag>>> DeleteTag(int id)
  {
    var response = new StatusResponse<IEnumerable<DTO.Tag>>() {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var tag = await context.Tags.Where(t => t.TagId == id).FirstOrDefaultAsync();
      context.Tags.Remove(tag);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = await GetTags();
    }
    catch (Exception ex)
    {
      logger.LogError("", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<IEnumerable<DTO.Tag>> GetTags()
  {
    var tags = await context.Tags
      .Include(t => t.Articles)
      .ToListAsync();
    return Utils.ConvertToDto<DB.Tag, DTO.Tag>(tags, tag => new DTO.Tag(tag));
  }

  public async Task<StatusResponse<DTO.Tag>> UpdateTag(DTO.Tag tag)
  {
    var response = new StatusResponse<DTO.Tag>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var tracking = context.Tags.Update(new DB.Tag(tag));
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Tag(tracking.Entity);
    }
    catch (Exception ex)
    {
      logger.LogError("", ex);
      response.Change = Change.Error;
    }
    return response;
  }
}
