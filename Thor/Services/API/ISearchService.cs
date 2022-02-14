using System.Threading.Tasks;
using Thor.Models;

namespace Thor.Services.Api
{
  public interface ISearchService
  {
    Task<SearchResult> Search(SearchRequest searchRequest);
  }
}