using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
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

}