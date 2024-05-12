using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Thor.Models.Dto;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Dto.Responses;
using Thor.Models.Mapping;

namespace Thor.Controllers.Dashboard
{
    [ApiController]
    [Route("api/dashboard/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IThorCategoryRepository categoryService;

        public CategoryController(IThorCategoryRepository categoryService)
        {
            this.categoryService = categoryService;
        }

        [Produces("application/json")]
        [HttpGet]
        [Authorize("author")]
        public ActionResult<IEnumerable<Category>> GetCategories()
        {
            var result = categoryService.GetCategories();
            return Ok(result.ToCategoryDtos());
        }

        [Produces("application/json")]
        [HttpPost]
        [Authorize("author")]
        public async Task<ActionResult<StatusResponse<Category>>> CreateCategory(Category category)
        {
            if (category == null)
            {
                return BadRequest("No data. Cannot create new Category");
            }
 
            var result = await categoryService.CreateCategory(category.ToCategoryDb());
            return Ok(result.ToCreateResponse());
        }

        [Produces("application/json")]
        [HttpPut]
        [Authorize("author")]
        public async Task<ActionResult<StatusResponse<Category>>> UpdateCategory(Category category)
        {
            if (category == null || category.CategoryId == 0)
            {
                return BadRequest("No data or Id was 0, cannot update the category");
            }

            var result = await categoryService.UpdateCategory(category.ToCategoryDb());
            return Ok(result.ToUpdateResponse());
        }

        [Produces("application/json")]
        [HttpDelete("{id}")]
        [Authorize("author")]
        public async Task<ActionResult<StatusResponse<IEnumerable<Category>>>> DeleteCategory(int id)
        {
            if (id == 0)
            {
                return BadRequest("Id was 0, cannot delete a category");
            }

            var result = await categoryService.DeleteCategory(id);
            return Ok(result.ToDeleteResponse());
        }
    }
}