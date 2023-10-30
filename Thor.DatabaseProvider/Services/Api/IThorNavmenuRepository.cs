using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorNavmenuRepository
{
  IQueryable<Navmenu> GetNavmenus();
  Task CreateNavmenu(Navmenu navmenu);
  Task UpdateNavmenu(Navmenu navmenu);
  Task ReorderNavmenu(IEnumerable<Navmenu> navmenus);
  Task DeleteNavmenu(int id);
}