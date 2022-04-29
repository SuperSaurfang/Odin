using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Thor.Models;
using Thor.Models.Dto.Responses;

namespace Thor.Services.Api
{
  public interface IFileStoreService
  {
    IWebHostEnvironment Environment { get; }

    Task<FileUploadResponse> SaveFile(IFormFile file);
  }
}