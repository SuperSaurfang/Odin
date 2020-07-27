using Thor.Util;
using Thor.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Thor.Services.Api
{
  public interface INavMenuService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }

    Task<IEnumerable<NavMenu>> GetNavMenus();

    Task<StatusResponse> CreateNavMenu(NavMenu navMenu);

    Task<StatusResponse> UpdateNavMenu(NavMenu navMenu);

    Task<StatusResponse> DeleteNavMenu(int id);
  }
}