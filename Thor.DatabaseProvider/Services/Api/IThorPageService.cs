using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorPageService
{
  Task<IEnumerable<Article>> GetPages();
  Task<Article> GetPage(string title);
  Task<Article> CreatePage(Article page);
  Task UpdatePage(Article page);
  Task DeletePages();
  Task AddTag(ArticleTag articleTag);
  Task RemoveTag(ArticleTag articleTag);
}