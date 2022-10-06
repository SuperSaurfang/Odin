using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorNavmenuService
{
  Task<IEnumerable<Article>> GetArticles();
  Task<IEnumerable<Category>> GetCategories();
  Task<IEnumerable<Navmenu>> GetNavmenus();
  Task<StatusResponse<Navmenu>> CreateNavmenu(Navmenu navmenu);
  Task<StatusResponse<Navmenu>> UpdateNavmenu(Navmenu navmenu);
  Task<StatusResponse<IEnumerable<Navmenu>>> ReorderNavmenu(IEnumerable<Navmenu> navmenus);
  Task<StatusResponse<IEnumerable<Navmenu>>> DeleteNavmenu(int id);
}