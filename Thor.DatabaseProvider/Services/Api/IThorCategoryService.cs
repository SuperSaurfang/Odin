using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCategoryService
{
  Task<IEnumerable<Category>> GetCategories();
  Task<Category> CreateCategory(Category category);
  Task UpdateCategory(Category category);
  Task DeleteCategory(int id);
}