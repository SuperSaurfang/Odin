using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Microsoft.Extensions.Logging;
using System;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultNavmenuRepository : IThorNavmenuRepository
{
    private readonly ThorContext context;
    private readonly ILogger<DefaultNavmenuRepository> logger;

    public DefaultNavmenuRepository(ThorContext context, ILogger<DefaultNavmenuRepository> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public async Task CreateNavmenu(Navmenu navmenu)
    {
        try
        {
            context.Navmenus.Add(navmenu);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on creating new Navmenu", ex);
        }
    }


    public async Task DeleteNavmenu(int id)
    {
        try
        {
            var entity = await context.Navmenus.Where(n => n.Id == id).FirstOrDefaultAsync();
            context.Navmenus.Remove(entity);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on delting navmenu", ex);
        }
    }

    public IQueryable<Navmenu> GetNavmenus()
    {
        return context.Navmenus.AsQueryable();
    }

    public async Task ReorderNavmenu(IEnumerable<Navmenu> navmenus)
    {
        try
        {
            context.Navmenus.UpdateRange(navmenus);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error reordering navmenu", ex);
        }
    }

    public async Task UpdateNavmenu(Navmenu navmenu)
    {
        try
        {
            context.Navmenus.Update(navmenu);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error reordering navmenu", ex);
        }
    }
}