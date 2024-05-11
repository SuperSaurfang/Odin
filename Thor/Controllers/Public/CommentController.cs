using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Dto;
using Thor.Services.Api;
using Thor.Extensions;
using Thor.Models.Dto.Responses;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class CommentController : ControllerBase
  {
    private readonly IThorPublicService _publicService;
    private readonly IOAuthService _oAuthService;
    public CommentController(IThorPublicService publicService, IOAuthService restClient)
    {
      _publicService = publicService;
      _oAuthService = restClient;
    }

    [Produces("application/json")]
    [HttpPost]
    public async Task<ActionResult<StatusResponse<Comment>>> PostComment(Comment comment)
    {
      if (comment.Article is null || comment.Article.ArticleId == 0)
      {
        return BadRequest("The article id cannot be 0");
      }
      var result = await _publicService.CreateComment(comment);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("{articleId}")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetCommentByArticleId(int articleId)
    {
      if (articleId == 0)
      {
        return BadRequest("Article id cannot be 0");
      }
      var result = await _publicService.GetCommentsForArticle(articleId);
      if (result == null)
      {
        return InternalError();
      }

      await _oAuthService.MapUserIdToUser(result);
      return Ok(result);
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }

}