using System.Threading.Tasks;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api
{
  public interface IThorSearchService
  {
    Task<SearchResult> Search(SearchRequest searchRequest);
  }
}