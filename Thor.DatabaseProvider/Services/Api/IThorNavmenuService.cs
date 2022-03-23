using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorNavmenuService
{
  Task<IEnumerable<Article>> GetArticles();
  Task<IEnumerable<Category>> GetCategories();
  Task<IEnumerable<Navmenu>> GetNavmenus();
  Task<Navmenu> CreateNavmenu(Navmenu navmenu);
  Task UpdateNavmenu(Navmenu navmenu);
  Task ReorderNavmenu(IEnumerable<Navmenu> navmenus);
  Task DeleteNavmenu(int id);
}