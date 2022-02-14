using System.Threading.Tasks;
using Thor.Models;
using DbExtensions;
using Thor.Services.Api;
using Thor.Util.ThorSqlBuilder;

namespace Thor.Services.Maria
{
  public class SearchService : ArticleServiceBase, ISearchService
  {
    private readonly ISqlExecuterService executerService;
    public SearchService(ISqlExecuterService executerService, IRestClientService restClient)
      : base(restClient)
    {
      this.executerService = executerService;
    }
    public async Task<SearchResult> Search(SearchRequest searchRequest)
    {
      var result = new SearchResult();
      // wrap search term in % char for sql search
      searchRequest.Term = $"%{searchRequest.Term}%";
      if (searchRequest.IsTextSearch || searchRequest.IsTitleSearch)
      {
        SqlBuilder articleSqlBuilder = SearchSqlBuilder.CreateArticleSearchSql(searchRequest.IsTextSearch, searchRequest.IsTitleSearch);
        articleSqlBuilder = SearchSqlBuilder.AddFromToDate(articleSqlBuilder,
          searchRequest.From is not null,
          searchRequest.To is not null);
        result.Articles = await executerService.ExecuteSql<Article>(articleSqlBuilder.ToString(), searchRequest);
        await MapUserIdToAuthor(result.Articles);
      }


      if (searchRequest.IsTagSearch)
      {
        SqlBuilder tagSearchSql = SearchSqlBuilder.CreateTagSearchSql();
        result.TagList = await executerService.ExecuteSql<Tag>(tagSearchSql.ToString(), new { Term = searchRequest.Term });
      }

      if (searchRequest.IsCategorySearch)
      {
        SqlBuilder categorySearchSql = SearchSqlBuilder.CreateCategorySearchSql();
        result.CategoryList = await executerService.ExecuteSql<Category>(categorySearchSql.ToString(), new { Term = searchRequest.Term });
      }
      return result;
    }
  }
}