// using System.Collections.Generic;
// using Microsoft.AspNetCore.Mvc;
// using Thor.Services.Api;
// using System.Threading.Tasks;
// using Thor.Models.Dto;
// using Microsoft.AspNetCore.Authorization;
// using Thor.DatabaseProvider.Services.Api;
// using Thor.Extensions;
// using Thor.Models.Dto.Responses;

// namespace Thor.Controllers.Dashboard
// {
//   [ApiController]
//   [Route("api/dashboard/[controller]")]
//   public class PageController : ControllerBase
//   {
//     private readonly IThorPageService pageService;
//     private readonly IRestClientService restClient;
//     public PageController(IThorPageService pageService, IRestClientService restClient)
//     {
//       this.pageService = pageService;
//       this.restClient = restClient;
//     }

//     [Produces("application/json")]
//     [HttpGet("{title}")]
//     [Authorize("author")]
//     public async Task<ActionResult<Article>> GetSinglePage(string title)
//     {
//       if (title == null || title == string.Empty || title.Length == 0)
//       {
//         return BadRequest("Unable to load page without title");
//       }

//       var article = await pageService.GetPage(title);
//       if (article == null)
//       {
//         return InternalError();
//       }
//       article.User = await restClient.MapUserIdToUser(article);
//       return Ok(article);
//     }

//     [Produces("application/json")]
//     [HttpGet]
//     [Authorize("author")]
//     public async Task<ActionResult<IEnumerable<Article>>> GetAllPages()
//     {
//       var pages = await pageService.GetPages();
//       if (pages == null)
//       {
//         return InternalError();
//       }
//       await restClient.MapUserIdToUser(pages);
//       return Ok(pages);
//     }

//     [Produces("application/json")]
//     [HttpPut]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<Article>>> UpdatePageArticle(Article article)
//     {
//       if (article.ArticleId == 0)
//       {
//         return BadRequest("Article id cannot be null");
//       }

//       var response = await pageService.UpdatePage(article);
//       return Ok(response);
//     }

//     [Produces("application/json")]
//     [HttpPost]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<Article>>> CreatePageArticle(Article article)
//     {
//       var response = await pageService.CreatePage(article);
//       response.Model.User = await restClient.MapUserIdToUser(response.Model);
//       return base.Ok(response);
//     }

//     [Produces("application/json")]
//     [HttpDelete]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<IEnumerable<Article>>>> DeletePageArticle()
//     {
//       var response = await pageService.DeletePages();
//       return Ok(response);
//     }
//     private ObjectResult InternalError(string message = "Internal Server Error")
//     {
//       return StatusCode(500, message);
//     }
//   }
// }