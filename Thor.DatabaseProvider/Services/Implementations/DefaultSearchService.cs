using System.Threading.Tasks;
using Thor.DatabaseProvider.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;
using Thor.DatabaseProvider.Extensions;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using System.Collections.Generic;

namespace Thor.DatabaseProvider.Services.Implementations
{
  public class DefaultSearchService : IThorSearchService
  {
    private readonly ThorContext thorContext;
    public DefaultSearchService(ThorContext thorContext)
    {
      this.thorContext = thorContext;
    }

    public async Task<SearchResult> Search(SearchRequest searchRequest)
    {
      var result = new SearchResult();
      if (searchRequest.IsTextSearch || searchRequest.IsTitleSearch) {
        var articleQuery = thorContext.Articles
          .Include(a => a.ArticleCategories)
          .Include(a => a.ArticleTags)
          .Where(a => a.Status == "public");

        if(searchRequest.Start is not null)
        {
          articleQuery = articleQuery.Where(a => a.CreationDate >= searchRequest.Start);
        }
        if(searchRequest.End is not null)
        {
          articleQuery = articleQuery.Where(a => a.CreationDate <= searchRequest.End);
        }

        if(searchRequest.IsTextSearch && !searchRequest.IsTitleSearch)
        {
          articleQuery = articleQuery.Where(a => a.ArticleText.Contains(searchRequest.Term));
        }
        if(searchRequest.IsTitleSearch && !searchRequest.IsTextSearch)
        {
          articleQuery = articleQuery.Where(a => a.Title.Contains(searchRequest.Term));
        }
        if(searchRequest.IsTitleSearch && searchRequest.IsTextSearch)
        {
          articleQuery = articleQuery.Where(a => a.ArticleText.Contains(searchRequest.Term) || a.Title.Contains(searchRequest.Term));
        }
        var articles = await articleQuery.ToListAsync();
        result.Articles = articles.ConvertList<DB.Article, DTO.Article>(article => new DTO.Article(article));
      }

      if(searchRequest.IsTagSearch)
      {
        var tags = await thorContext.Tags
          .Include(t => t.Articles)
          .Where(t => t.Name.Contains(searchRequest.Term))
          .ToListAsync();
        result.TagList =tags.ConvertList<DB.Tag, DTO.Tag>(tag => new DTO.Tag(tag));
      }

      if(searchRequest.IsCategorySearch)
      {
        var categories = await thorContext.Categories
          .Include(c => c.Articles)
          .Where(c => c.Name.Contains(searchRequest.Term))
          .ToListAsync();
        result.CategoryList = categories.ConvertList<DB.Category, DTO.Category>(category => new DTO.Category(category));
      }
      return result;
    }
  }
}