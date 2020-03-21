using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;

namespace Thor.Controllers {

  [ApiController]
  [Route("api/[controller]")]
  public class BlogController : ControllerBase  {
    
    private readonly IBlogService blogService;

    public BlogController(IBlogService blogService) {
      this.blogService = blogService;
    }

    [Produces("application/json")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Article>>> GetAllPublicPost() {
      var result = await blogService.GetPublicBlog();
      if(result == null) {
        return InternalError();
      }
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("{title}")]
    public async Task<ActionResult<Article>> GetSinglePublicPost(string title) {
      if(title == null) {
        return BadRequest("Title cannot be null");
      }
      var result = await blogService.GetSinglePublicPost(title);
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