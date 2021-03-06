using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System;

namespace Thor.Controllers
{
  #region public nav menu controller
  [ApiController]
  [Route("api/[controller]")]
  public class NavMenuController : ControllerBase
  {

    private readonly INavMenuService navMenuService;

    public NavMenuController(INavMenuService navMenuService)
    {
      this.navMenuService = navMenuService;
    }
    [Produces("application/json")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NavMenu>>> GetNavMenu()
    {
      var result = await navMenuService.GetNavMenu();
      return Ok(result);
    }
  }
  #endregion

  #region admin nav menu controller
  [ApiController]
  [Route("api/[controller]")]
  public class AdminNavMenuController : ControllerBase
  {
    private readonly INavMenuService navMenuService;

    public AdminNavMenuController(INavMenuService navMenuService)
    {
      this.navMenuService = navMenuService;
    }

    [Produces("application/json")]
    [HttpGet("article-list")]
    [Authorize("edit:menu")]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticleList()
    {
      var result = await navMenuService.GetArticleList();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("edit:menu")]
    public async Task<ActionResult<IEnumerable<NavMenu>>> GetFlatList()
    {
      var result = await navMenuService.GetFlatList();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("create:menu")]
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
    [Authorize("edit:menu")]
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
    [Authorize("delete:menu")]
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
  #endregion
}