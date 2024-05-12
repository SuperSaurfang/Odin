using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCategoryRepository
{
  IQueryable<Category> GetCategories();
  Task<Category> CreateCategory(Category category);
  Task<Category> UpdateCategory(Category category);
  Task<IEnumerable<Category>> DeleteCategory(int id);
}