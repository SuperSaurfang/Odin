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
      IEnumerable<User> nicknames = await restClient.GetUserNicknames(new List<string>() { "user_id:", result.UserId }, new List<string>() { "user_id", "nickname", "picture" });
      var query = nicknames.AsQueryable();
      return (from name in query where name.UserId.Equals(result.UserId) select name.Nickname).FirstOrDefault();
    }

    public static async Task MapUserIdToAuthor(this IRestClientService restClient, IEnumerable<Article> result)
    {
      var listOfSearchQuery = new List<string>() { "user_id:" };
      var uniqueUserIds = result.Select(item => item.UserId).Distinct();
      listOfSearchQuery.AddRange(uniqueUserIds);
      IEnumerable<User> nickNames = await restClient.GetUserNicknames(listOfSearchQuery, new List<string>() { "user_id", "nickname", "picture" });
      var query = nickNames.AsQueryable();

      foreach (var item in result)
      {
        item.Author = (from name in query where name.UserId.Equals(item.UserId) select name.Nickname).FirstOrDefault();
      }
    }
  }
}