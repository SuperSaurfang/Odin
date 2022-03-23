using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.DatabaseProvider.Util;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultNavmenuService : IThorNavmenuService
{
  private readonly ThorContext context;

  public DefaultNavmenuService(ThorContext context)
  {
    this.context = context;
  }

  public async Task<DTO.Navmenu> CreateNavmenu(DTO.Navmenu navmenu)
  {
    var result = await context.Navmenus.AddAsync(new DB.Navmenu(navmenu));
    await context.SaveChangesAsync();
    return new DTO.Navmenu(result.Entity);
  }


  public async Task DeleteNavmenu(int id)
  {
    var entity = await context.Navmenus.Where(n => n.NavmenuId == id).FirstOrDefaultAsync();
    context.Navmenus.Remove(entity);
    await context.SaveChangesAsync();
  }

  public async Task<IEnumerable<DTO.Article>> GetArticles()
  {
    var articles = await context.Articles.Where(a => a.IsPage == true && a.Status.Equals("public")).ToListAsync();
    return Utils.ConvertToDto<DB.Article, DTO.Article>(articles, article => new DTO.Article(article));
  }

  public async Task<IEnumerable<DTO.Category>> GetCategories()
  {
    var categories = await context.Categories.ToListAsync();
    return Utils.ConvertToDto<DB.Category, DTO.Category>(categories, category => new DTO.Category(category));
  }

  public async Task<IEnumerable<DTO.Navmenu>> GetNavmenus()
  {
    var navmenus = await context.Navmenus
      .Include(n => n.ChildNavmenu)
      .OrderBy(n => n.NavmenuOrder)
      .ToListAsync();

    return Utils.ConvertToDto<DB.Navmenu, DTO.Navmenu>(navmenus, navmenu => new DTO.Navmenu(navmenu));
  }

  public async Task ReorderNavmenu(IEnumerable<DTO.Navmenu> navmenus)
  {
    var dbNavmenus = Utils.ConvertToDto<DTO.Navmenu, DB.Navmenu>(navmenus, navmenu => new DB.Navmenu(navmenu));
    context.Navmenus.UpdateRange(dbNavmenus);
    await context.SaveChangesAsync();
  }

  public async Task UpdateNavmenu(DTO.Navmenu navmenu)
  {
    var dbnavmneu = new DB.Navmenu(navmenu);
    context.Navmenus.Update(dbnavmneu);
    await context.SaveChangesAsync();
  }
}