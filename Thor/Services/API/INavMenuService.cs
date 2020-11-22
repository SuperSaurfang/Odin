using Thor.Util;
using Thor.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Thor.Services.Api
{
  public interface INavMenuService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }

    Task<IEnumerable<NavMenu>> GetNavMenu();

    Task<IEnumerable<NavMenu>> GetFlatList();

    Task<IEnumerable<Article>> GetArticleList();

    Task<StatusResponse> CreateNavMenu(NavMenu navMenu);

    Task<StatusResponse> UpdateNavMenu(NavMenu navMenu);

    Task<StatusResponse> DeleteNavMenu(int id);
  }
}