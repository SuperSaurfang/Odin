using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.Services.Api;
using Thor.Extensions;
using Thor.DatabaseProvider.Services.Api;
using Microsoft.AspNetCore.Authorization;
using Thor.Models.Dto.Responses;
using Thor.Models.Mapping;
using System.Linq;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class BlogController : ControllerBase
  {
    private readonly IThorArticleRepository blogService;

    private readonly IOAuthService restClient;

    public BlogController(IThorArticleRepository blogService, IOAuthService restClient)
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
      var result = await blogService.GetBlogArticle(title);
      if (result == null)
      {
        return InternalError();
      }
      var article = result.ToArticleDto();
      article.User = await restClient.MapUserIdToUser(article);
      return Ok(article);
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
      var query = blogService.GetArticles();
      if (query == null)
      {
        return InternalError();
      }
      var filtered = query.Where(x => x.IsBlog);
      var articles = filtered.ToArticleDto();
      await restClient.MapUserIdToUser(articles);
      return Ok(articles);
    }

    /// <summary>
    /// Update the given blog post
    /// </summary>
    /// <param name="article">The blog post to update</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> UpdateArticle(Article article)
    {
      if (article.ArticleId == 0)
      {
        return BadRequest("the article id cannot be zero.");
      }

      var status = await blogService.UpdateArticle(article.ToBlogArticleDb());
      return Ok(status.ToStatusResponseDto());
    }

    /// <summary>
    /// Create a new blog post
    /// </summary>
    /// <param name="article">The data of the new blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> CreateArticle(Article article)
    {
      if (article.UserId == string.Empty)
      {
        return BadRequest("UserId cannot be zero");
      }

      var statusResponse = await blogService.CreateArticle(article.ToBlogArticleDb());    
      return Ok(statusResponse.ToStatusResponseDto());
    }

    /// <summary>
    /// Delete the given blog post completly
    /// </summary>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpDelete]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<IEnumerable<Article>>>> DeleteBlogArticle()
    {
        var trash = blogService.GetArticles().Where(a => a.Status == Models.Database.ArticleStatus.Trash);
        var status = await blogService.DeleteBlogArticles(trash);
        return Ok(status.ToStatusResponseDto());
    }

    [Produces("application/json")]
    [HttpPost]
    [Route("Category/{id}")]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> AddCategoryToBlogPost(Category category, int id)
    {
      if(category is null)
      {
        return BadRequest("Cannot be null.");
      }
      var response = await blogService.AddCategory(category.ToCategoryDb(), id);
      return Ok(response.ToStatusResponseDto());
    }

    [Produces("application/json")]
    [HttpDelete]
    [Route("Category/{id}")]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> RemoveCategoryFromBlogPost(Category category, int id)
    {
      if(category is null)
      {
        return BadRequest("Cannot be null.");
      }

      var response = await blogService.RemoveCategory(category.ToCategoryDb(), id);
      return Ok(response.ToStatusResponseDto());
    }

    [Produces("application/json")]
    [HttpPost]
    [Route("Tag/{id}")]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> AddTagToBlogPost(Tag tag, int id)
    {
      if(tag is null)
      {
        return BadRequest("Cannot be null");
      }

      var response = await blogService.AddTag(tag.ToTagDb(), id);
      return Ok(response.ToStatusResponseDto());
    }

    [Produces("application/json")]
    [HttpDelete]
    [Route("Tag")]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> RemoveTagFromBlogPost(Tag tag, int id)
    {
      if(tag is null)
      {
        return BadRequest("Cannot be null");
      }

      var response = await blogService.RemoveTag(tag.ToTagDb(), id);
      return Ok(response.ToStatusResponseDto());
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

  }
}