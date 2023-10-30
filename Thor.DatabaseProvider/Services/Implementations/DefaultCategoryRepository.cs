using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Microsoft.Extensions.Logging;
using System;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultCategoryRepository : IThorCategoryRepository
{
    private readonly ThorContext context;
    private readonly ILogger<DefaultCategoryRepository> logger;

    public DefaultCategoryRepository(ThorContext context, ILogger<DefaultCategoryRepository> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public async Task CreateCategory(Category category)
    {
        try
        {
            context.Categories.Add(category);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on creating new category", ex);
        }
    }

    public async Task DeleteCategory(int id)
    {
        try
        {
            var entity = await context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
            context.Categories.Remove(entity);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on deleting category", ex);
        }
    }

    public IQueryable<Category> GetCategories()
    {
        return context.Categories.AsQueryable();
    }

    public async Task UpdateCategory(Category category)
    {
        try
        {
            context.Categories.Update(category);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on updating category", ex);
        }
    }
}