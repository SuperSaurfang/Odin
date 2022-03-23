using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorTagService
{
  Task<IEnumerable<Tag>> GetTags();
  Task<Tag> CreateTag(Tag tag);
  Task UpdateTag(Tag tag);
  Task DeleteTag(int id);
}