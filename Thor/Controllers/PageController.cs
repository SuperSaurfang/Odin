using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thor.Services.Api;
using System.Threading.Tasks;
using Thor.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Thor.Util;

namespace Thor.Controllers {

  [ApiController]
  [Route("api/[controller]")]
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
      if(title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var article = await pageService.GetPublicArticleByTitle(title);
      if(article == null)
      {
        return InternalError();
      }

      return Ok(article);
    }

    [Produces("application/json")]
    [HttpGet("admin/{title}")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult<Article>> GetSinglePage(string title)
    {
      if(title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var article = await pageService.GetArticleByTitle(title);
      if(article == null)
      {
        return InternalError();
      }

      return Ok(article);
    }

    [Produces("application/json")]
    [HttpGet("admin/id/{title}")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult<int>> GetPageId(string title)
    {
      if(title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var result = await pageService.GetArticleId(title);
      if(result == 0)
      {
        return InternalError();
      }

      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult<IEnumerable<Article>>> GetAllPages()
    {
      var result = await pageService.GetAllArticles();
      if(result == null)
      {
        return InternalError();
      }

      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPut("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> UpdatePageArticle(Article article)
    {
      if(article.ArticleId == 0)
      {
        return BadRequest("Article id cannot be null");
      }

      var response = await pageService.UpdateArticle(article);
      return Ok(response);
    }

    [Produces("application/json")]
    [HttpPost("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> CreatePageArticle(Article article)
    {
      var response = await pageService.CreateArticle(article);
      return Ok(response);
    }

    [Produces("application/json")]
    [HttpDelete("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> DeletePageArticle()
    {
      var response = await pageService.DeleteArticle();
      return Ok(response);
    }
    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

  }
}