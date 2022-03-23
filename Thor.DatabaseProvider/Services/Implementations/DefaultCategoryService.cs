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

internal class DefaultCategoryService : IThorCategoryService
{
  private readonly ThorContext context;

  public DefaultCategoryService(ThorContext context)
  {
    this.context = context;
  }

  public async Task<DTO.Category> CreateCategory(DTO.Category category)
  {
    var dbCategory = new DB.Category(category);
    var result = await context.Categories.AddAsync(dbCategory);
    await context.SaveChangesAsync();
    return new DTO.Category(result.Entity);
  }

  public async Task DeleteCategory(int id)
  {
    var entity = await context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();
    context.Categories.Remove(entity);
    await context.SaveChangesAsync();
  }

  public async Task<IEnumerable<DTO.Category>> GetCategories()
  {
    var categories = await context.Categories.ToListAsync();
    return Utils.ConvertToDto<DB.Category, DTO.Category>(categories, category => new DTO.Category(category));
  }

  public async Task UpdateCategory(DTO.Category category)
  {
    var dbCategory = new DB.Category(category);
    context.Categories.Update(dbCategory);
    await context.SaveChangesAsync();
  }
}