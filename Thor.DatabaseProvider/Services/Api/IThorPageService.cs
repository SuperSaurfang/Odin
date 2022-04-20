using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorPageService
{
  Task<IEnumerable<Article>> GetPages();
  Task<Article> GetPage(string title);
  Task<StatusResponse<Article>> CreatePage(Article page);
  Task<StatusResponse<Article>> UpdatePage(Article page);
  Task<StatusResponse<IEnumerable<Article>>> DeletePages();
  Task<StatusResponse<ArticleTag>> AddTag(ArticleTag articleTag);
  Task<StatusResponse<IEnumerable<ArticleTag>>> RemoveTag(ArticleTag articleTag);
}