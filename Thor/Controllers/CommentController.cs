using System.Collections.Generic;
using System.Threading.Tasks;
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
    public CommentController(ICommentService commentService) {
      this.commentService = commentService;
    }

    [Produces("application/json")]
    [HttpPost]
    public ActionResult<Comment> PostComment(Comment comment)
    {
      return StatusCode(501, "Waiting for Rework");
    }

    [Produces("application/json")]
    [HttpGet("{articleId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetCommentByArticleId(int articleId)
    {
      if(articleId == 0) {
        return BadRequest("Article id cannot be zero");
      }
      var result = await commentService.GetComments(articleId);
      if(result == null) {
        return InternalError();
      }
      return Ok(result);
    }

    private ObjectResult InternalError() {
      return StatusCode(500, "Internal Server Error");
    }
  }
}