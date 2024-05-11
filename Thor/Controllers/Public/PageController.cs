using Microsoft.AspNetCore.Mvc;
using Thor.Services.Api;
using System.Threading.Tasks;
using Thor.Extensions;
using Thor.Models.Dto;
using Thor.DatabaseProvider.Services.Api;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class PageController : ControllerBase
  {
    private readonly IThorPublicService _publicService;
    private readonly IOAuthService _oAuthService;

    public PageController(IThorPublicService publicService, IOAuthService restClient)
    {
      _publicService = publicService;
      _oAuthService = restClient;
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    public async Task<ActionResult<Article>> GetPublicPage(string title)
    {
      if (title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var article = await _publicService.GetPage(title);
      if (article == null)
      {
        return InternalError();
      }
      article.User = await _oAuthService.MapUserIdToUser(article);
      return Ok(article);
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }
  }

}