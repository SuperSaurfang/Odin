using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;

namespace Thor.Extensions 
{
  public static class UserIdMapper 
  {
    public static async Task<string> MapUserIdToAuthor(this IRestClientService restClient, Article result) 
    {
      var nicknames = await restClient.GetUserNicknames();
      var query = nicknames.AsQueryable();
      return (from name in query where name.UserId.Equals(result.UserId) select name.Nickname).FirstOrDefault();
    }

    public static async Task MapUserIdToAuthor(this IRestClientService restClient, IEnumerable<Article> result)
    {
      var nickNames = await restClient.GetUserNicknames();
      var query = nickNames.AsQueryable();

      foreach (var item in result)
      {
        item.Author = (from name in query where name.UserId.Equals(item.UserId) select name.Nickname).FirstOrDefault();
      }
    }
  }
}