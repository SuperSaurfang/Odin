using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using Thor.Services.Api;

namespace Thor.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class NavMenuController : ControllerBase
  {

    private readonly INavMenuService navMenuService;

    public NavMenuController(INavMenuService navMenuService)
    {
      this.navMenuService = navMenuService;
    }

    [HttpGet]
    public ActionResult<NavMenu> GetNavMenu()
    {
      return Ok();
    }
  }
}