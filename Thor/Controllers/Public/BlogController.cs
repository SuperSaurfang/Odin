using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.DatabaseProvider.Services.Api;
using Thor.Services.Api;
using Thor.Extensions;
using Thor.Models.Dto.Responses;
using Thor.Models.Dto.Requests;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class BlogController : ControllerBase
  {

    private readonly IThorPublicService blogService;
    private readonly IRestClientService restClient;

    public BlogController(IThorPublicService blogService, IRestClientService restClient)
    {
      this.blogService = blogService;
      this.restClient = restClient;
    }

    /// <summary>
    /// Get all public blog posts
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPost]
    public async Task<ActionResult<ArticleResponse>> GetAllPublicBlog(Paging paging)
    {
      // var result = await blogService.GetAllPublicArticles();
      var result = await blogService.GetBlog(paging);
      if (result == null)
      {
        return InternalError();
      }

      await restClient.MapUserIdToUser(result.Articles);
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
      // var result = await blogService.GetPublicArticleByTitle(title);
      var result = await blogService.GetBlogByTitle(title);
      if (result == null)
      {
        return InternalError();
      }

      result.User = await restClient.MapUserIdToUser(result);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost("category")]
    public async Task<ActionResult<ArticleResponse>> GetCategoryBlog(ArticleRequest category)
    {
      if(category == null)
      {
        return BadRequest("Category cannot be null");
      }
      // var result = await blogService.GetCategoryBlog(category);
      var result = await blogService.GetBlogByCategory(category);
      if(result == null)
      {
        return InternalError();
      }
      await restClient.MapUserIdToUser(result.Articles);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost("tag")]
    public async Task<ActionResult<ArticleResponse>> GetBlogByTag(ArticleRequest tag)
    {
      if(tag is null)
      {
        return BadRequest("Tag cannot be null");
      }
      var result = await blogService.GetBlogByTag(tag);
      if(result == null)
      {
        return InternalError();
      }
      await restClient.MapUserIdToUser(result.Articles);
      return Ok(result);
    }
    
    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }
  }

}