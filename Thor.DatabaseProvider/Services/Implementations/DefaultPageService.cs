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

internal class DefaultPageService : IThorPageService
{
  private readonly ThorContext context;

  public DefaultPageService(ThorContext context)
  {
    this.context = context;
  }

  public async Task AddTag(DTO.ArticleTag articleTag)
  {
    await context.ArticleTags.AddAsync(new DB.ArticleTag(articleTag));
    await context.SaveChangesAsync();
  }

  public async Task<DTO.Article> CreatePage(DTO.Article page)
  {
    var dbPage = new DB.Article(page)
    {
      IsBlog = false,
      IsPage = true,
    };
    var result = await context.Articles.AddAsync(dbPage);
    await context.SaveChangesAsync();
    return new DTO.Article(result.Entity);
  }

  public async Task DeletePages()
  {
    var trash = await context.Articles
      .Where(a => a.IsPage == true && a.Status.Equals("trash"))
      .ToListAsync();
    context.Articles.RemoveRange(trash);
    await context.SaveChangesAsync();
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

  public async Task RemoveTag(DTO.ArticleTag articleTag)
  {
    context.ArticleTags.Remove(new DB.ArticleTag(articleTag));
    await context.SaveChangesAsync();
  }

  public async Task UpdatePage(DTO.Article page)
  {
    context.Articles.Update(new DB.Article(page));
    await context.SaveChangesAsync();
  }
}
