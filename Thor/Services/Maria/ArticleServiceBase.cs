using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using System.Linq;

namespace Thor.Services.Maria
{
  public abstract class ArticleServiceBase
  {
    protected readonly IRestClientService restClient;

    public ArticleServiceBase(IRestClientService restClient)
    {
      this.restClient = restClient;
    }
    protected async Task<string> MapUserIdToAuthor(Article result)
    {
      var nicknames = await restClient.GetUserNicknames();
      var query = nicknames.AsQueryable();
      return (from name in query where name.UserId.Equals(result.UserId) select name.Nickname).FirstOrDefault();
    }

    protected async Task MapUserIdToAuthor(IEnumerable<Article> result)
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