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
using System;
using Microsoft.Extensions.Logging;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultCommentService : IThorCommentService
{
  private readonly ThorContext context;
  private readonly ILogger<DefaultCommentService> logger;

  public DefaultCommentService(ThorContext context, ILogger<DefaultCommentService> logger)
  {
    this.context = context;
    this.logger = logger;
  }

  public async Task<StatusResponse<DTO.Comment>> CreateComment(DTO.Comment comment)
  {
    var response = new StatusResponse<DTO.Comment>() {
      ResponseType = StatusResponseType.Create
    };
    try
    {
      var dbComment = new DB.Comment(comment);
      await context.Comments.AddAsync(dbComment);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Comment(dbComment);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on creating new comment", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<StatusResponse<IEnumerable<DTO.Comment>>> DeleteComments()
  {
    var response = new StatusResponse<IEnumerable<DTO.Comment>>() {
      ResponseType = StatusResponseType.Delete
    };
    try
    {
      var trash = await context.Comments.Where(c => c.Status.Equals("trash")).ToListAsync();
      context.Comments.RemoveRange(trash);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = await GetComments();
    }
    catch (Exception ex)
    {
      logger.LogError("Error on deleting comment", ex);
      response.Change = Change.Error;
    }
    return response;
  }

  public async Task<IEnumerable<DTO.Article>> GetArticles()
  {
    var articles = await context.Articles.Where(a => a.IsBlog == true).ToListAsync();
    return articles.ConvertList<DB.Article, DTO.Article>(article => new DTO.Article(article));
  }

  public async Task<IEnumerable<DTO.Comment>> GetComments()
  {
    var comments = await context.Comments.ToListAsync();
    return comments.ConvertList<DB.Comment, DTO.Comment>(comment => new DTO.Comment(comment));
  }

  public async Task<StatusResponse<DTO.Comment>> UpdateComment(DTO.Comment comment)
  {
    var response = new StatusResponse<DTO.Comment>() {
      ResponseType = StatusResponseType.Update
    };
    try
    {
      var dbComment = new DB.Comment(comment);
      context.Comments.Update(dbComment);
      await context.SaveChangesAsync();
      response.Change = Change.Change;
      response.Model = new DTO.Comment(dbComment);
    }
    catch (Exception ex)
    {
      logger.LogError("Error on updating comment", ex);
      response.Change = Change.Error;
    }
    return response;
  }
}