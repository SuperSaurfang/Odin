using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using DTO = Thor.Models.Dto;
using DB = Thor.Models.Database;
using Thor.DatabaseProvider.Util;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultTagService : IThorTagService
{
  private readonly ThorContext context;

  public DefaultTagService(ThorContext context)
  {
    this.context = context;
  }

  public async Task<DTO.Tag> CreateTag(DTO.Tag tag)
  {
    var dbTag = new DB.Tag(tag);
    var result = await context.Tags.AddAsync(dbTag);
    await context.SaveChangesAsync();
    return new DTO.Tag(result.Entity);
  }

  public async Task DeleteTag(int id)
  {
    var tag = await context.Tags.Where(t => t.TagId == id).FirstOrDefaultAsync();
    context.Tags.Remove(tag);
    await context.SaveChangesAsync();
  }

  public async Task<IEnumerable<DTO.Tag>> GetTags()
  {
    var tags = await context.Tags.ToListAsync();
    return Utils.ConvertToDto<DB.Tag, DTO.Tag>(tags, tag => new DTO.Tag(tag));
  }

  public async Task UpdateTag(DTO.Tag tag)
  {
    context.Tags.Update(new DB.Tag(tag));
    await context.SaveChangesAsync();
  }
}
