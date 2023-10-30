using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorTagRepository
{
  IQueryable<Tag> GetTags();
  Task CreateTag(Tag tag);
  Task UpdateTag(Tag tag);
  Task DeleteTag(int id);
}