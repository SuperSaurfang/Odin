using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class SearchController : ControllerBase
  {
    private readonly ISearchService searchService;
    public SearchController(ISearchService searchService)
    {
      this.searchService = searchService;
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