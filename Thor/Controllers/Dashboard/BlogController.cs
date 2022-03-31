using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.Services.Api;
using Thor.Extensions;
using Thor.DatabaseProvider.Services.Api;
using Microsoft.AspNetCore.Authorization;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class BlogController : ControllerBase
  {
    private readonly IThorBlogService blogService;

    private readonly IRestClientService restClient;

    public BlogController(IThorBlogService blogService, IRestClientService restClient)
    {
      this.blogService = blogService;
      this.restClient = restClient;
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    [Authorize("author")]
    public async Task<ActionResult<Article>> GetArticleByTitle(string title)
    {
      if (title == null)
      {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetArticle(title);
      if (result == null)
      {
        return InternalError();
      }
      result.User = await restClient.MapUserIdToUser(result);
      return Ok(result);
    }

    /// <summary>
    /// Ge all blog posts for the admin dashboard
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetAllArticles()
    {
      var result = await blogService.GetArticles();
      if (result == null)
      {
        return InternalError();
      }
      await restClient.MapUserIdToUser(result);
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
    public async Task<ActionResult> UpdateArticle(Article article)
    {
      if (article.ArticleId == 0)
      {
        return BadRequest("the article id cannot be zero.");
      }

      await blogService.UpdateArticle(article);

      return Ok();
    }

    /// <summary>
    /// Create a new blog post
    /// </summary>
    /// <param name="article">The data of the new blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult<Article>> CreateArticle(Article article)
    {
      if (article.UserId == string.Empty)
      {
        return BadRequest("UserId cannot be zero");
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
      await blogService.DeleteArticles();
      return Ok();
    }

    [Produces("application/json")]
    [HttpPost]
    [Route("Category")]
    [Authorize("author")]
    public async Task<ActionResult> AddCategoryToBlogPost(ArticleCategory articleCategory)
    {
      if(articleCategory is null)
      {
        return BadRequest("Cannot be null.");
      }
      await blogService.AddCategory(articleCategory);
      return Ok();
    }

    [Produces("application/json")]
    [HttpDelete]
    [Route("Category")]
    [Authorize("author")]
    public async Task<ActionResult> RemoveCategoryFromBlogPost(ArticleCategory articleCategory)
    {
      if(articleCategory is null)
      {
        return BadRequest("Cannot be null.");
      }

      await blogService.RemoveCategory(articleCategory);
      return Ok();
    }

    [Produces("application/json")]
    [HttpPost]
    [Route("Tag")]
    [Authorize("author")]
    public async Task<ActionResult> AddTagToBlogPost(ArticleTag articleTag)
    {
      if(articleTag is null)
      {
        return BadRequest("Cannot be null");
      }

      await blogService.AddTag(articleTag);
      return Ok();
    }

    [Produces("application/json")]
    [HttpDelete]
    [Route("Tag")]
    [Authorize("author")]
    public async Task<ActionResult> RemoveTagFromBlogPost(ArticleTag articleTag)
    {
      if(articleTag is null)
      {
        return BadRequest("Cannot be null");
      }

      await blogService.RemoveTag(articleTag);
      return Ok();
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

  }
}