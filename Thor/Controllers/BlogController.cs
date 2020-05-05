using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace Thor.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
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
    public async Task<ActionResult<IEnumerable<Article>>> GetAllPublicPost()
    {
      var result = await blogService.GetPublicBlog();
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
    public async Task<ActionResult<Article>> GetSinglePublicPost(string title)
    {
      if (title == null)
      {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetSinglePublicPost(title);
      if (result == null)
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
    [HttpGet("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> GetFullBlog()
    {
      var result = await blogService.GetFullBlog();
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
    [HttpPost("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> UpdateBlogPost(Article article)
    {
      if (article.ArticleId == 0)
      {
        return BadRequest("the article id cannot be zero.");
      }

      var result = await blogService.UpdateBlogPost(article);
      JObject response = CreateJson(result);
      return Ok(response);
    }

    /// <summary>
    /// Create a new blog post
    /// </summary>
    /// <param name="article">The data of the new blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPut("admin")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> CreateBlogPost(Article article)
    {
      var result = await blogService.CreateBlogPost(article);
      if (result == ChangeResponse.Error) {
        return InternalError();
      }
      JObject response = CreateJson(result);
      return Ok(response);
    }

    /// <summary>
    /// Delete the given blog post completly
    /// </summary>
    /// <param name="id">The id of the blogpost to delete</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpDelete("admin/{id}")]
    [Authorize(Policy = "ModeratorPolicy")]
    public async Task<ActionResult> DeleteBlogPost(int id)
    {
      if(id == 0 || id < -1) 
      {
        return BadRequest("id cannot be zero or negative");
      }

      var result = await blogService.DeleteBlogPost(id);
      if (result == ChangeResponse.Error) {
        return InternalError();
      }
      JObject response = CreateJson(result);
      return Ok(response);
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

    private static JObject CreateJson(ChangeResponse result)
    {
      return new JObject(new JProperty("ChangeResponse", result.ToString()));
    }
  }
}