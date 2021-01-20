using System;
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

    public async Task<StatusResponse> CreateNavMenu(NavMenu navMenu)
    {
      const string sql = "INSERT INTO `Navmenu`(`PageId`, `NavMenuOrder`) VALUES (@PageId, @NavMenuOrder)";
      var result = await executer.ExecuteSql(sql, navMenu);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> DeleteNavMenu(int id)
    {
      const string sql = "DELETE FROM `Navmenu` WHERE `NavMenuId` = @id";
      var result = await executer.ExecuteSql(sql, new { id = id });
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
    }

    public Task<IEnumerable<Article>> GetArticleList()
    {
      const string sql = "SELECT `ArticleId`, `Title` FROM `Article` WHERE `IsPage` = 1";
      return executer.ExecuteSql<Article>(sql);
    }

    public async Task<IEnumerable<NavMenu>> GetNavMenu()
    {
      const string sql = "SELECT `NavMenuId`, `Article`.`Title`, `DisplayText`, `NavMenuOrder`, `ParentId` FROM `Navmenu`, `Article` WHERE `PageId` = `Article`.`ArticleId`";
      List<NavMenu> result = (List<NavMenu>)await executer.ExecuteSql<NavMenu>(sql);

      result.Sort((a, b) => b.NavMenuOrder.CompareTo(a.NavMenuOrder));

      foreach(var menuItem in result)
      {
        if(menuItem.ParentId != null)
        {
          var parent = result.Find(f => f.NavMenuId == menuItem.ParentId);
          if(parent.Children == null)
          {
            parent.Children = new List<NavMenu>();
          }
          parent.Children.Insert(0, menuItem);
          parent.IsDropdowm = true;
        }
      }
      result.RemoveAll(r => r.ParentId != null);
      result.Reverse();

      return result;
    }

    public Task<IEnumerable<NavMenu>> GetFlatList()
    {
      const string sql = "SELECT `NavMenuId`, `Article`.`Title`, `DisplayText`, `NavMenuOrder`, `ParentId`, IF(`Navmenu`.`ParentId`, 'true', 'false') AS 'IsDropdown' FROM `Navmenu`, `Article` WHERE `PageId` = `Article`.`ArticleId`";
      return executer.ExecuteSql<NavMenu>(sql);
    }

    public async Task<StatusResponse> UpdateNavMenu(NavMenu navMenu)
    {
      const string sql = "UPDATE `Navmenu` SET `ParentId`= @ParentId, `DisplayText`= @DisplayText, `NavMenuOrder` = @NavMenuOrder WHERE `NavMenuId` = @NavMenuId";
      var result = await executer.ExecuteSql(sql, navMenu);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
    }
  }
}
