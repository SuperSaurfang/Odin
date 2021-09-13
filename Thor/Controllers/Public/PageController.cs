using Microsoft.AspNetCore.Mvc;
using Thor.Services.Api;
using System.Threading.Tasks;
using Thor.Models;
using Newtonsoft.Json.Linq;
using Thor.Util;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class PageController : ControllerBase
  {
    private readonly IPageService pageService;

    public PageController(IPageService pageService)
    {
      this.pageService = pageService;
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    public async Task<ActionResult<Article>> GetPublicPage(string title)
    {
      if (title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var article = await pageService.GetPublicArticleByTitle(title);
      if (article == null)
      {
        return InternalError();
      }

      return Ok(article);
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }
  }

}