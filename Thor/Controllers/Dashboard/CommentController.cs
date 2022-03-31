using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Dto;
using Thor.Services.Api;
using Thor.Extensions;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class CommentController : ControllerBase
  {
    private readonly IThorCommentService commentService;

    private readonly IRestClientService restClient;

    public CommentController(IThorCommentService commentService, IRestClientService restClient)
    {
      this.commentService = commentService;
      this.restClient = restClient;
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
    {
      var comments = await commentService.GetComments();
      return Ok(comments);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult> UpdateComment(Comment comment)
    {
      if(comment.CommentId == 0)
      {
        return BadRequest("The comment id cannot be 0.");
      }

      await commentService.UpdateComment(comment);
      return Ok();
    }

    [Produces("application/json")]
    [HttpDelete]
    [Authorize("author")]
    public async Task<ActionResult> DeleteComments()
    {
      await commentService.DeleteComments();
      return Ok();
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult> CreateComment(Comment comment)
    {
      if(comment.ArticleId == 0)
      {
        return BadRequest("The article id cannot be 0");
      }
      var result = await commentService.CreateComment(comment);
      await restClient.MapUserIdToUser(result);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("article-list")]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
    {
      var result = await commentService.GetArticles();
      await restClient.MapUserIdToUser(result);
      return Ok(result);
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }
}