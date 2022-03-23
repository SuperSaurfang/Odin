using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.DatabaseProvider.Util;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultCommentService : IThorCommentService
{
  private readonly ThorContext context;

  public DefaultCommentService(ThorContext context)
  {
    this.context = context;
  }

  public async Task<DTO.Comment> CreateComment(DTO.Comment comment)
  {
    var dbComment = new DB.Comment(comment);
    var result = await context.Comments.AddAsync(dbComment);
    await context.SaveChangesAsync();
    return new DTO.Comment(result.Entity);
  }

  public async Task DeleteComments()
  {
    var trash = await context.Comments.Where(c => c.Status.Equals("trash")).ToListAsync();
    context.Comments.RemoveRange(trash);
    await context.SaveChangesAsync();
  }

  public async Task<IEnumerable<DTO.Article>> GetArticles()
  {
    var articles = await context.Articles.Where(a => a.IsBlog == true).ToListAsync();
    return Utils.ConvertToDto<DB.Article, DTO.Article>(articles, article => new DTO.Article(article));
  }

  public async Task<IEnumerable<DTO.Comment>> GetComments()
  {
    var comments = await context.Comments.ToListAsync();
    return Utils.ConvertToDto<DB.Comment, DTO.Comment>(comments, comment => new DTO.Comment(comment));
  }

  public async Task UpdateComment(DTO.Comment comment)
  {
    context.Comments.Update(new DB.Comment(comment));
    await context.SaveChangesAsync();
  }
}