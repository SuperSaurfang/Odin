using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorTagService
{
  Task<IEnumerable<Tag>> GetTags();
  Task<StatusResponse<Tag>> CreateTag(Tag tag);
  Task<StatusResponse<Tag>> UpdateTag(Tag tag);
  Task<StatusResponse<IEnumerable<Tag>>> DeleteTag(int id);
}