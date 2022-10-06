using Microsoft.AspNetCore.Http;

namespace Thor.Models.Dto.Requests
{
  public class FileUploadRequest
  {
    public IFormFile File { get; set; }
  }
}

