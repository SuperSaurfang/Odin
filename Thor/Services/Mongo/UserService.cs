using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using MongoDB.Driver;

namespace Thor.Services.Mongo
{
  public class UserService : IUserService
  {
    public UserService(IMongoConnectionService connectionService)
    {
      Collection = connectionService.GetCollection<User>("user");
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
    }
    public UnderlayingDatabase UnderlayingDatabase { get; }

    private IMongoCollection<User> Collection { get; }

    public User Authenticate(User user)
    {
      throw new System.NotImplementedException();
    }

    public Task<User> GetUser(string userMail)
    {
      throw new System.NotImplementedException();
    }
  }
}