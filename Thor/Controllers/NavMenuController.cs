using Microsoft.AspNetCore.Mvc;
using Thor.Models;

namespace Thor.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class NavMenuController : ControllerBase
  {

    [HttpGet]
    public ActionResult<NavMenu> GetNavMenu()
    {
      return Ok();
    }
  }
}