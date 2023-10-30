using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCategoryRepository
{
  IQueryable<Category> GetCategories();
  Task CreateCategory(Category category);
  Task UpdateCategory(Category category);
  Task DeleteCategory(int id);
}