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

    private readonly IRestClientService restClient;

    public BlogController(IThorArticleRepository blogService, IRestClientService restClient)
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
      var article = result.ToArticleDto();
      article.User = await restClient.MapUserIdToUser(article);
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
      var result = blogService.GetArticles();
      if (result == null)
      {
        return InternalError();
      }
      var articles = result.ToArticleDtos();
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

      await blogService.UpdateArticle(article.ToBlogArticleDb());
      return Ok();
    }

    /// <summary>
    /// Create a new blog post
    /// </summary>
    /// <param name="article">The data of the new blog post</param>
    /// <returns></returns>
    [Produces("application/json")]
    [HttpPost]
    //[Authorize("author")]
    public async Task<ActionResult<StatusResponse<Article>>> CreateArticle(Article article)
    {
      if (article.UserId == string.Empty)
      {
        return BadRequest("UserId cannot be zero");
      }

      var createdArticle = await blogService.CreateArticle(article.ToBlogArticleDb());
      
      if(createdArticle is null) {
        return InternalError();
      }
      
      var response = new StatusResponse<Article> 
      {
        Change = Change.Change,
        Model = createdArticle.ToArticleDto(),
        ResponseType = StatusResponseType.Create,
      };
      return Ok(response);
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
        await blogService.DeleteArticles(trash);
        return Ok();
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
      await blogService.AddCategory(category.ToCategoryDb(), id);
      return Ok();
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

      await blogService.RemoveCategory(category.ToCategoryDb(), id);
      return Ok();
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

      await blogService.AddTag(tag.ToTagDb(), id);
      return Ok();
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

      await blogService.RemoveTag(tag.ToTagDb(), id);
      return Ok();
    }

    private ObjectResult InternalError(string message = "Internal Server Error")
    {
      return StatusCode(500, message);
    }

  }
}