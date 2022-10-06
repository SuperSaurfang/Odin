using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Extensions;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  [Authorize("author")]
  public class FileUploadController : ControllerBase
  {
    private readonly IFileStoreService fileStore;

    public FileUploadController(IFileStoreService fileStore)
    {
      this.fileStore = fileStore;
    }

    [HttpPost]
    [Produces("application/json")]
    public async Task<ActionResult<string>> UploadFile([FromForm] FileUploadRequest fileRequest)
    {
      if (!fileRequest.File.ContentType.StartsWith("image"))
      {
        return BadRequest("Only images supported, for the moment");
      }
      FileUploadResponse response = await fileStore.SaveFile(fileRequest.File);
      response = fileStore.CheckIsDevelopment(response, this.Request);
      return Ok(response);
    }
  }
}

