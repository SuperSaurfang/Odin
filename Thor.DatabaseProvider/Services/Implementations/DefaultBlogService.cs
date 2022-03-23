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

internal class DefaultBlogService : IThorBlogService
{
  private readonly ThorContext context;

  public DefaultBlogService(ThorContext context)
  {
    this.context = context;
  }
  public async Task AddCategory(DTO.ArticleCategory articleCategory)
  {
    await context.ArticleCategories.AddAsync(new DB.ArticleCategory(articleCategory));
    await context.SaveChangesAsync();
  }

  public async Task AddTag(DTO.ArticleTag articleTag)
  {
    await context.ArticleTags.AddAsync(new DB.ArticleTag(articleTag));
    await context.SaveChangesAsync();
  }

  public async Task<DTO.Article> CreateArticle(DTO.Article article)
  {
    var dbArticle = new DB.Article(article)
    {
      IsBlog = true,
      IsPage = false
    };
    var result = await context.Articles.AddAsync(dbArticle);
    await context.SaveChangesAsync();
    return new DTO.Article(result.Entity);
  }

  public async Task DeleteArticles()
  {
    var trash = await context.Articles
      .Where(a => a.IsBlog == true && a.Status.Equals("trash"))
      .ToListAsync();
    context.Articles.RemoveRange(trash);
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

  public async Task RemoveCategory(DTO.ArticleCategory articleCategory)
  {
    var entity = new DB.ArticleCategory(articleCategory);
    context.ArticleCategories.Remove(entity);
    await context.SaveChangesAsync();
  }

  public async Task RemoveTag(DTO.ArticleTag articleTag)
  {
    var entity = new DB.ArticleTag(articleTag);
    context.ArticleTags.Remove(entity);
    await context.SaveChangesAsync();
  }

  public async Task UpdateArticle(DTO.Article article)
  {
    context.Articles.Update(new DB.Article(article));
    await context.SaveChangesAsync();
  }
}