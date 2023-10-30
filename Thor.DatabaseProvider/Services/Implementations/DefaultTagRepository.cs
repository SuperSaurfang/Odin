using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using System;
using Microsoft.Extensions.Logging;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultTagRepository : IThorTagRepository
{
    private readonly ThorContext context;
    private readonly ILogger<DefaultTagRepository> logger;

    public DefaultTagRepository(ThorContext context, ILogger<DefaultTagRepository> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public async Task CreateTag(Tag tag)
    {
        try
        {
            context.Tags.Add(tag);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on creating new tag", ex);
        }
    }

    public async Task DeleteTag(int id)
    {
        try
        {
            var tag = await context.Tags.Where(t => t.Id == id).FirstOrDefaultAsync();
            context.Tags.Remove(tag);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on deleting tag", ex);
        }
    }

    public IQueryable<Tag> GetTags()
    {
        return context.Tags.AsQueryable();
    }

    public async Task UpdateTag(Tag tag)
    {
        try
        {
            context.Tags.Update(tag);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on updating tag", ex);
        }
    }
}
