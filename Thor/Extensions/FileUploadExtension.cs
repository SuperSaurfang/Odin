using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Thor.Models;
using Thor.Services.Api;
using Microsoft.AspNetCore.Http;
using Thor.Models.Dto.Responses;

namespace Thor.Extensions
{
  public static class FileUploadExtension
  {
    /// <summary>
    /// Check if the environment is in dev mode, if so we modify the path property with the scheme and the host
    /// </summary>
    /// <param name="service"></param>
    /// <param name="response"></param>
    /// <param name="request"></param>
    /// <returns></returns>
    public static FileUploadResponse CheckIsDevelopment(this IFileStoreService service, FileUploadResponse response, HttpRequest request)
    {
      if(service.Environment.IsDevelopment()) {
        var baseUrl = $"{request.Scheme}://{request.Host.Value}";
        response.Path = $"{baseUrl}/{response.Path}";
      }

      return response;
    }
  }
}

