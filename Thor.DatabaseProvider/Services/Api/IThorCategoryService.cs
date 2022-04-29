using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCategoryService
{
  Task<IEnumerable<Category>> GetCategories();
  Task<StatusResponse<Category>> CreateCategory(Category category);
  Task<StatusResponse<Category>> UpdateCategory(Category category);
  Task<StatusResponse<IEnumerable<Category>>> DeleteCategory(int id);
}