// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Thor.DatabaseProvider.Services.Api;
// using Thor.Models.Dto;
// using Thor.Models.Dto.Responses;

// namespace Thor.Controllers.Dashboard
// {
//   [ApiController]
//   [Route("api/dashboard/[controller]")]
//   [Authorize("author")]

//   public class TagController : ControllerBase
//   {
//     private readonly IThorTagRepository tagService;
//     public TagController(IThorTagRepository tagService)
//     {
//       this.tagService = tagService;
//     }

//     [Produces("application/json")]
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
//     {
//       var result = await tagService.GetTags();
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpPost]
//     public async Task<ActionResult<StatusResponse<Tag>>> CreateTag(Tag tag)
//     {
//       if (tag == null)
//       {
//         return BadRequest("No data. Cannot create new tag.");
//       }

//       var result = await tagService.CreateTag(tag);
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpPut]
//     public async Task<ActionResult<StatusResponse<Tag>>> UpdateTag(Tag tag)
//     {
//       if (tag == null || tag.TagId <= 0)
//       {
//         return BadRequest($"No data or Id was {tag?.TagId}, cannot update the tag.");
//       }

//       var result = await tagService.UpdateTag(tag);
//       return Ok(result);
//     }

//     [Produces("application/json")]
//     [HttpDelete("{id}")]
//     public async Task<ActionResult<StatusResponse<IEnumerable<Tag>>>> DeleteTag(int id)
//     {
//       if (id <= 0)
//       {
//         return BadRequest($"Id was {id}, cannot delete a tag");
//       }
//       var result = await tagService.DeleteTag(id);
//       return Ok(result);
//     }
//   }
// }