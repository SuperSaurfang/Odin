using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Thor.Models;
using BCrypt.Net;
using Thor.Services;
using System;
using Microsoft.Extensions.Configuration;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {

    private readonly IUserService userService;
    public AuthController(IUserService userService)
    {
      this.userService = userService;
    }

    [Produces("application/json")]
    [HttpPost]
    public async Task<ActionResult> Login(User user)
    {
      if (user.UserMail == null)
      {
        return BadRequest("Email cannot be null");
      }
      if (user.UserPassword == null)
      {
        return BadRequest("Password cannot be null");
      }

      try
      {
        var result = await userService.GetUser(user.UserMail);
        if (result == null)
        {
          return Unauthorized("Email is wrong");
        }

        var isValid = BCrypt.Net.BCrypt.Verify(user.UserPassword, result.UserPassword);
        if(!isValid) {
          return Unauthorized("Password is wrong");
        }

        result = userService.Authenticate(result);
        return Ok(result);
      }
      catch (Exception)
      {
        return InternalError();
      }
    }

    private ObjectResult InternalError()
    {
      return StatusCode(500, "Internal Server Error");
    }
  }
}