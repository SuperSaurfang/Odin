using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Thor.Models;
using Thor.Services.Api;

namespace Thor.Services
{
  public class FileStoreService : IFileStoreService
  {
    private readonly IWebHostEnvironment environment;
    private readonly string contentRooPath;

    public FileStoreService(IWebHostEnvironment environment)
    {
      this.environment = environment;
      contentRooPath = Path.Combine(Environment.ContentRootPath, "MyFiles");
    }

    public IWebHostEnvironment Environment { get => environment; }

    public async Task<FileUploadResponse> SaveFile(IFormFile file)
    {
      string typePathSection = MapMimeType(file.ContentType);
      string relativePath = Path.Combine(typePathSection, DateTime.UtcNow.ToShortDateString());
      string relativeUrlPath = Path.Combine("files", relativePath, file.FileName);

      string absolutePath = Path.Combine(contentRooPath, relativePath);
      string absolutePathWithFile = Path.Combine(absolutePath, file.FileName);


      if (!Directory.Exists(absolutePath))
      {
        Directory.CreateDirectory(absolutePath);
      }

      using (var stream = System.IO.File.Create(absolutePathWithFile))
      {
        await file.CopyToAsync(stream);
      }

      return new FileUploadResponse
      {
        Path = relativeUrlPath
      };
    }

    private string MapMimeType(string mimeType)
    {
      if (mimeType.StartsWith("image"))
      {
        return "images";
      }
      if (mimeType.StartsWith("audio"))
      {
        return "audio";
      }
      if (mimeType.StartsWith("video"))
      {
        return "video";
      }
      return string.Empty;
    }
  }
}