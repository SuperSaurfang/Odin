using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Services.Api;

namespace Thor.Controllers
{
  [ApiController]
  [Route("api/public/[controller]")]
  public class NavMenuController : ControllerBase
  {
    private readonly IThorPublicService publicService;

    public NavMenuController(IThorPublicService publicService)
    {
      this.publicService = publicService;
    }
    [Produces("application/json")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Navmenu>>> GetNavMenu()
    {
      var result = await publicService.GetNavMenu();
      return Ok(result);
    }
  }

}