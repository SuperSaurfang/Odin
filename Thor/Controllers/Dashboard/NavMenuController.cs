// using Microsoft.AspNetCore.Mvc;
// using Thor.Models.Dto;
// using Thor.Services.Api;
// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;
// using Thor.DatabaseProvider.Services.Api;
// using Thor.Models.Dto.Responses;

// namespace Thor.Controllers.Dashboard
// {
//   [ApiController]
//   [Route("api/dashboard/[controller]")]
//   public class NavMenuController : ControllerBase
//   {
//     private readonly IThorNavmenuRepository navMenuService;

//     public NavMenuController(IThorNavmenuRepository navMenuService)
//     {
//       this.navMenuService = navMenuService;
//     }

//     [Produces("application/json")]
//     [HttpGet("articles")]
//     [Authorize("author")]
//     public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
//     {
//       var result = await navMenuService.GetArticles();
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpGet("categories")]
//     [Authorize("author")]
//     public async Task<ActionResult<IEnumerable<Article>>> GetCategoryList()
//     {
//       var result = await navMenuService.GetCategories();
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpGet]
//     [Authorize("author")]
//     public async Task<ActionResult<IEnumerable<Navmenu>>> GetNavmenu()
//     {
//       var result = await navMenuService.GetNavmenus();
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpPost]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<Navmenu>>> CreateNavMenuEntry(Navmenu navMenu)
//     {
//       var result = await navMenuService.CreateNavmenu(navMenu);
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpPut]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<Navmenu>>> UpdateNavMenuEntry(Navmenu navMenu)
//     {
//       if (navMenu.NavmenuId == 0)
//       {
//         return BadRequest("NavMenuId is required to update the menu entry");
//       }
//       var result = await navMenuService.UpdateNavmenu(navMenu);
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpPut("reorder")]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<Navmenu>>> ReorderNavmenu(IEnumerable<Navmenu> navMenus)
//     {
//       var result = await navMenuService.ReorderNavmenu(navMenus);
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpDelete("{id}")]
//     [Authorize("author")]
//     public async Task<ActionResult<StatusResponse<IEnumerable<Navmenu>>>> DeleteNavMenuEntry(int id)
//     {
//       if(id == 0)
//       {
//         return BadRequest("Id cannot be null");
//       }
//       var result = await navMenuService.DeleteNavmenu(id);
//       return Ok(result);
//     }
//   }
// }