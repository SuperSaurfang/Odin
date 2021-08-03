using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class NavMenuController : ControllerBase
  {
    private readonly INavMenuService navMenuService;

    public NavMenuController(INavMenuService navMenuService)
    {
      this.navMenuService = navMenuService;
    }

    [Produces("application/json")]
    [HttpGet("article-list")]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
    {
      var result = await navMenuService.GetArticleList();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<NavMenu>>> GetFlatList()
    {
      var result = await navMenuService.GetFlatList();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse>> CreateNavMenuEntry(NavMenu navMenu)
    {
      if (navMenu.PageId == 0)
      {
        return BadRequest("Unable to create menu entry. Please specify the page");
      }
      var result = await navMenuService.CreateNavMenu(navMenu);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse>> UpdateNavMenuEntry(NavMenu navMenu)
    {
      if (navMenu.NavMenuId == 0)
      {
        return BadRequest("NavMenuId is required to update the menu entry");
      }
      var result = await navMenuService.UpdateNavMenu(navMenu);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpDelete("{id}")]
    [Authorize("author")]
    public async Task<ActionResult<StatusResponse>> DeleteNavMenuEntry(int id)
    {
      if(id == 0)
      {
        return BadRequest("Id cannot be null");
      }
      var result = await navMenuService.DeleteNavMenu(id);
      return Ok(result);
    }
  }
}