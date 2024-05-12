using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Microsoft.Extensions.Logging;
using System;
using Thor.Models.Database;
using System.Collections.Generic;

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

    public async Task<Category> CreateCategory(Category category)
    {
        context.Categories.Add(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task<IEnumerable<Category>> DeleteCategory(int id)
    {
        var entity = await context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
        context.Categories.Remove(entity);
        await context.SaveChangesAsync();
        return GetCategories();
    }

    public IQueryable<Category> GetCategories()
    {
        return context.Categories
            .Include(c => c.Articles)
        .AsQueryable();
    }

    public async Task<Category> UpdateCategory(Category category)
    {
        context.Categories.Update(category);
        await context.SaveChangesAsync();
        return category;
    }
}