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
    private readonly IThorPublicService publicService;
    private readonly IRestClientService restClient;
    public CommentController(IThorPublicService publicService, IRestClientService restClient)
    {
      this.publicService = publicService;
      this.restClient = restClient;
    }

    [Produces("application/json")]
    [HttpPost]
    public async Task<ActionResult<StatusResponse<Comment>>> PostComment(Comment comment)
    {
      if (comment.ArticleId == 0)
      {
        return BadRequest("The article id cannot be 0");
      }
      var result = await publicService.CreateComment(comment);
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
      var result = await publicService.GetCommentsForArticle(articleId);
      if (result == null)
      {
        return InternalError();
      }

      await restClient.MapUserIdToUser(result);
      return Ok(result);
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }

}