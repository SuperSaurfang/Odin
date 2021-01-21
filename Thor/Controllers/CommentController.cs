using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services;
using Thor.Services.Api;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CommentController : ControllerBase
  {
    private readonly ICommentService commentService;
    public CommentController(ICommentService commentService)
    {
      this.commentService = commentService;
    }

    [Produces("application/json")]
    [HttpPost]
    public async Task<ActionResult<StatusResponse>> PostComment(Comment comment)
    {
      if (comment.ArticleId == 0)
      {
        return BadRequest("The article id cannot be 0");
      }
      var result = await commentService.PostComment(comment);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("{articleId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetCommentByArticleId(int articleId)
    {
      if (articleId == 0)
      {
        return BadRequest("Article id cannot be zero");
      }
      var result = await commentService.GetPublicComments(articleId);
      if (result == null)
      {
        return InternalError();
      }
      return Ok(result);
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }

  [ApiController]
  [Route("api/[controller]")]
  public class AdminCommentController : ControllerBase
  {
    private readonly ICommentService commentService;

    public AdminCommentController(ICommentService commentService)
    {
      this.commentService = commentService;
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("edit:comment")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
    {
      var comments = await commentService.GetComments();
      return Ok(comments);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("edit:comment")]
    public async Task<ActionResult<StatusResponse>> UpdateComment(Comment comment)
    {
      if(comment.CommentId == 0)
      {
        return BadRequest("The comment id cannot be 0.");
      }

      var result = await commentService.UpdateComment(comment);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpDelete]
    [Authorize("delete:comment")]
    public async Task<ActionResult<StatusResponse>> DeleteComments()
    {
      var result = await commentService.DeleteComment();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("create:comment")]
    public async Task<ActionResult<StatusResponse>> CreateComment(Comment comment)
    {
      if(comment.ArticleId == 0)
      {
        return BadRequest("The article id cannot be 0");
      }
      var result = await commentService.PostComment(comment);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("article-list")]
    [Authorize("create:comment")]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
    {
      var result = await commentService.GetArticleList();
      return Ok(result);
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }
}