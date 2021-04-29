using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thor.Services.Api;
using System.Threading.Tasks;
using Thor.Models;
using Microsoft.AspNetCore.Authorization;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class PageController : ControllerBase
  {
    private readonly IPageService pageService;
    public PageController(IPageService pageService)
    {
      this.pageService = pageService;
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    [Authorize("author")]
    public async Task<ActionResult<Article>> GetSinglePage(string title)
    {
      if (title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var article = await pageService.GetArticleByTitle(title);
      if (article == null)
      {
        return InternalError();
      }

      return Ok(article);
    }

    [Produces("application/json")]
    [HttpGet("id/{title}")]
    [Authorize("author")]
    public async Task<ActionResult<int>> GetPageId(string title)
    {
      if (title == null || title == string.Empty || title.Length == 0)
      {
        return BadRequest("Unable to load page without title");
      }

      var result = await pageService.GetArticleId(title);
      if (result == 0)
      {
        return InternalError();
      }

      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetAllPages()
    {
      var result = await pageService.GetAllArticles();
      if (result == null)
      {
        return InternalError();
      }

      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult> UpdatePageArticle(Article article)
    {
      if (article.ArticleId == 0)
      {
        return BadRequest("Article id cannot be null");
      }

      var response = await pageService.UpdateArticle(article);
      return Ok(response);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult> CreatePageArticle(Article article)
    {
      var response = await pageService.CreateArticle(article);
      return Ok(response);
    }

    [Produces("application/json")]
    [HttpDelete]
    [Authorize("author")]
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