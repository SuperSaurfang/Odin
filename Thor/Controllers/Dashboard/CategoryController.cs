using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.DatabaseProvider.Services.Api;

namespace Thor.Controllers.Dashboard
{
  [ApiController]
  [Route("api/dashboard/[controller]")]
  public class CategoryController : ControllerBase
  {
    private readonly IThorCategoryService categoryService;

    public CategoryController(IThorCategoryService categoryService)
    {
      this.categoryService = categoryService;
    }

    [Produces("application/json")]
    [HttpGet]
    [Authorize("author")]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
      var result = await categoryService.GetCategories();
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPost]
    [Authorize("author")]
    public async Task<ActionResult<Category>> CreateCategory(Category category)
    {
      if (category == null)
      {
        return BadRequest("No data. Cannot create new Category");
      }

      var result = await categoryService.CreateCategory(category);
      return Ok(result);
    }

    [Produces("application/json")]
    [HttpPut]
    [Authorize("author")]
    public async Task<ActionResult> UpdateCategory(Category category)
    {
      if (category == null || category.CategoryId == 0)
      {
        return BadRequest("No data or Id was 0, cannot update the category");
      }

      await categoryService.UpdateCategory(category);
      return Ok();
    }

    [Produces("application/json")]
    [HttpDelete("{id}")]
    [Authorize("author")]
    public async Task<ActionResult> DeleteCategory(int id)
    {
      if(id == 0)
      {
        return BadRequest("Id was 0, cannot delete a category");
      }

      await categoryService.DeleteCategory(id);
      return Ok();
    }
  }
}