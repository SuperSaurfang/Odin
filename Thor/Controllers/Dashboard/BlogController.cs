using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using Microsoft.AspNetCore.Authorization;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class BlogController : ControllerBase
  {
    private readonly IBlogService blogService;

    public BlogController(IBlogService blogService)
    {
      this.blogService = blogService;
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    [Authorize("author")]
    public async Task<ActionResult<Article>> GetSingleArticle(string title)
    {
      if (title == null)
      {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetArticleByTitle(title);
      if (result == null)
      {
        return InternalError();
      }
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("id/{title}")]
    [Authorize("author")]
    public async Task<ActionResult<int>> GetBlogId(string title)
    {
      if (title == null)
      {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetArticleId(title);
      if (result == 0)
      {
        return InternalError();
      }
      return Ok(result);
    }

    /// <summary>
    /// Ge all blog posts for the admin dashboard
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetFullBlog()
    {
      var result = await blogService.GetAllArticles();
      if (result == null)
      {
        return InternalError();
      }
      return Ok(result);
    }

    /// <summary>
    /// Update the given blog post
    /// </summary>
    /// <param name="article">The blog post to update</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult> UpdateBlogArticle(Article article)
    {
      if (article.ArticleId == 0)
      {
        return BadRequest("the article id cannot be zero.");
      }

      var response = await blogService.UpdateArticle(article);
      return Ok(response);
    }

    /// <summary>
    /// Create a new blog post
    /// </summary>
    /// <param name="article">The data of the new blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult> CreateBlogArticle(Article article)
    {
      if (article.Author == string.Empty)
      {
        return BadRequest("Author cannot be zero");
      }

      var response = await blogService.CreateArticle(article);
      return Ok(response);
    }

    /// <summary>
    /// Delete the given blog post completly
    /// </summary>
    /// <param name="id">The id of the blogpost to delete</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpDelete]
    [Authorize("author")]
    public async Task<ActionResult> DeleteBlogArticle()
    {
      var response = await blogService.DeleteArticle();
      return Ok(response);
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

  }
}