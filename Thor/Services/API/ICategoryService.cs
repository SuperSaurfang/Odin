using Thor.Util;
using System.Threading.Tasks;
using System.Collections.Generic;
using Thor.Models;

namespace Thor.Services.Api
{
  public interface ICategoryService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Category>> GetCategories();
    Task<StatusResponse> UpdateCategory(Category category);
    Task<StatusResponse> CreateCategory(Category category);
    Task<StatusResponse> DeleteCategory(int id);
  }
}