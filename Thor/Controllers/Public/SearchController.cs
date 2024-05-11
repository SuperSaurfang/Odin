using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;
using Thor.Services.Api;
using Thor.Extensions;
using System.Linq;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class SearchController : ControllerBase
  {
    private readonly IThorSearchService _searchService;
    private readonly IOAuthService _oAuthService;
    public SearchController(IThorSearchService searchService, IOAuthService restClient)
    {
      _searchService = searchService;
      _oAuthService = restClient;
    }

    [HttpPost]
    public async Task<ActionResult<SearchResult>> Search(SearchRequest searchRequest)
    {
      if(searchRequest.Term is null)
      {
        return BadRequest("The search term cannot be null");
      }

      var result = await _searchService.Search(searchRequest);
      if(result is not null)
      {
        if(result.Articles.Count() > 0)
        {
          await _oAuthService.MapUserIdToUser(result.Articles);
        }
        return Ok(result);
      }

      return InternalError();
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }
  }
}