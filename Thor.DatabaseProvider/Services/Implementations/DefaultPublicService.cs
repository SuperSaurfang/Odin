using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.DatabaseProvider.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Services.Api;
using DB = Thor.Models.Database;
using DTO = Thor.Models.Dto;
using System;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultPublicService : IThorPublicService
{
  private const string ARTICLE_STATUS = "public";
  private ThorContext context;

  public DefaultPublicService(ThorContext context)
  {
    this.context = context;
  }
  public async Task<IEnumerable<DTO.Article>> GetBlog()
  {
    var articles = await context.Articles
      .Include(s => s.Categories)
      .Include(s => s.Tags)
      .Where(a => IsPublicBlog(a))
      .OrderByDescending(x => x.CreationDate)
      .ToListAsync();
    return ConvertToDto<DB.Article, DTO.Article>(articles, article => new DTO.Article(article));
  }



  public async Task<IEnumerable<DTO.Article>> GetBlogByCategory(string category)
  {
    var articles = await context.Categories
      .Include(s => s.Articles)
        .ThenInclude(s => s.Tags)
      .Include(s => s.Articles)
        .ThenInclude(s => s.Categories)
      .Where(c => c.Name.Equals(category))
      .Select(c => c.Articles)
      .FirstOrDefaultAsync();

    var filtered = articles
      .Where(a => IsPublicBlog(a))
      .OrderByDescending(x => x.CreationDate);

    return ConvertToDto<DB.Article, DTO.Article>(filtered, article => new DTO.Article(article));
  }



  public async Task<IEnumerable<DTO.Article>> GetBlogByTag(string tag)
  {
    var articles = await context.Tags
      .Include(s => s.Articles)
        .ThenInclude(s => s.Tags)
      .Include(s => s.Articles)
        .ThenInclude(s => s.Categories)
      .Where(c => c.Name.Equals(tag))
      .Select(c => c.Articles)
      .FirstOrDefaultAsync();

    var filtered = articles
      .Where(a => IsPublicBlog(a))
      .OrderByDescending(x => x.CreationDate);

    return ConvertToDto<DB.Article, DTO.Article>(filtered, article => new DTO.Article(article));
  }

  public async Task<DTO.Article> GetBlogByTitle(string title)
  {
    var article = await context.Articles
      .Include(c => c.Categories)
      .Include(c => c.Tags)
      .Where(a => IsPublicBlog(a) && a.Title.Equals(title))
      .FirstOrDefaultAsync();


    return new DTO.Article(article);
  }

  public async Task<DTO.Article> GetPage(string title)
  {
    var article = await context.Articles
      .Where(a => IsPublicPage(a) && a.Title.Equals(title))
      .FirstOrDefaultAsync();

    return new DTO.Article(article);
  }



  public async Task<IEnumerable<DTO.Navmenu>> GetNavMenu()
  {
    var navmenus = await context.Navmenus
      .OrderBy(x => x.NavmenuOrder)
      .ToListAsync();

    return ConvertToDto<DB.Navmenu, DTO.Navmenu>(navmenus, navmenu => new DTO.Navmenu(navmenu));
  }

  public async Task CreateComment(DTO.Comment comment)
  {
    // ToDo This need improvement e.q spam detection and much more
    comment.Status = comment.UserId.Equals("guest") ? "new" : "released";
    var result = await context.Comments.AddAsync(new DB.Comment(comment));
    context.SaveChanges();
  }

  public async Task<IEnumerable<DTO.Comment>> GetCommentsForArticle(int articleId)
  {
    const string COMMENT_STATUS = "released";
    var comments = await context.Comments
      .Include(c => c.Replies.Where(c => c.Status.Equals(COMMENT_STATUS)))
      .Where(c => c.Status.Equals(COMMENT_STATUS) && c.ArticleId.Equals(articleId) && c.AnswerOf == null)
      .OrderByDescending(x => x.CreationDate)
      .ToListAsync();

    return ConvertToDto<DB.Comment, DTO.Comment>(comments, comment => new DTO.Comment(comment));
  }

  private static bool IsPublicBlog(DB.Article article)
  {
    return article.Status.Equals(ARTICLE_STATUS) && article.IsBlog == true;
  }
  private static bool IsPublicPage(DB.Article article)
  {
    return article.Status.Equals(ARTICLE_STATUS) && article.IsPage == true;
  }

  private static IEnumerable<TResult> ConvertToDto<TSource, TResult>(IEnumerable<TSource> list, Func<TSource, TResult> newFunc)
  {
    var results = new List<TResult>();
    foreach (var item in list)
    {
      results.Add(newFunc(item));
    }
    return results;
  }
}