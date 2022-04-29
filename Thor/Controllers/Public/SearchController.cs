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
    private readonly IThorSearchService searchService;
    private readonly IRestClientService restClient;
    public SearchController(IThorSearchService searchService, IRestClientService restClient)
    {
      this.searchService = searchService;
      this.restClient = restClient;
    }

    [HttpPost]
    public async Task<ActionResult<SearchResult>> Search(SearchRequest searchRequest)
    {
      if(searchRequest.Term is null)
      {
        return BadRequest("The search term cannot be null");
      }

      var result = await searchService.Search(searchRequest);
      if(result is not null)
      {
        if(result.Articles.Count() > 0)
        {
          await restClient.MapUserIdToUser(result.Articles);
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