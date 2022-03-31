using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.Services.Api;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Thor.DatabaseProvider.Services.Api;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class NavMenuController : ControllerBase
  {
    private readonly IThorNavmenuService navMenuService;

    public NavMenuController(IThorNavmenuService navMenuService)
    {
      this.navMenuService = navMenuService;
    }

    [Produces("application/json")]
    [HttpGet("articles")]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
    {
      var result = await navMenuService.GetArticles();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet("categories")]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetCategoryList()
    {
      var result = await navMenuService.GetCategories();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Navmenu>>> GetFlatList()
    {
      var result = await navMenuService.GetNavmenus();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult<Navmenu>> CreateNavMenuEntry(Navmenu navMenu)
    {
      var result = await navMenuService.CreateNavmenu(navMenu);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult> UpdateNavMenuEntry(Navmenu navMenu)
    {
      if (navMenu.NavmenuId == 0)
      {
        return BadRequest("NavMenuId is required to update the menu entry");
      }
      await navMenuService.UpdateNavmenu(navMenu);
      return Ok();
    }

    [Produces("application/json")]
    [HttpDelete("{id}")]
    [Authorize("author")]
    public async Task<ActionResult> DeleteNavMenuEntry(int id)
    {
      if(id == 0)
      {
        return BadRequest("Id cannot be null");
      }
      await navMenuService.DeleteNavmenu(id);
      return Ok();
    }
  }
}