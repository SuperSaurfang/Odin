using Microsoft.AspNetCore.Http;

namespace Thor.Models
{
  public class FileUploadRequest
  {
    public IFormFile File { get; set; }
  }
}

