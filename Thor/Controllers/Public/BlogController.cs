using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authentication;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class BlogController : ControllerBase
  {

    private readonly IBlogService blogService;

    public BlogController(IBlogService blogService)
    {
      this.blogService = blogService;
    }

    /// <summary>
    /// Get all public blog posts
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Article>>> GetAllPublicBlog()
    {
      var result = await blogService.GetAllPublicArticles();
      if (result == null)
      {
        return InternalError();
      }
      return Ok(result);
    }

    /// <summary>
    /// get a blog post by the title
    /// </summary>
    /// <param name="title">the title of the blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpGet("{title}")]
    public async Task<ActionResult<Article>> GetSinglePublicArticle(string title)
    {
      if (title == null)
      {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetPublicArticleByTitle(title);
      if (result == null)
      {
        return InternalError();
      }
      return Ok(result);
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }
  }

}