using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services
{
  public class NavMenuService : INavMenuService
  {
    private readonly ISqlExecuterService executer;

    public NavMenuService(ISqlExecuterService executer)
    {
      this.executer = executer;
      this.UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }
    public UnderlayingDatabase UnderlayingDatabase { get; }

    public Task<StatusResponse> CreateNavMenu(NavMenu navMenu)
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> DeleteNavMenu(int id)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<NavMenu>> GetNavMenus()
    {
      throw new System.NotImplementedException();
    }

    public Task<StatusResponse> UpdateNavMenu(NavMenu navMenu)
    {
      throw new System.NotImplementedException();
    }
  }
}
