using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface ITagService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Tag>> GetTags();
    Task<StatusResponse> UpdateTag(Tag tag);
    Task<StatusResponse> CreateTag(Tag tag);
    Task<StatusResponse> DeleteTag(int id);
  }
}
