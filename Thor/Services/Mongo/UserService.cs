using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Mongo 
{
  public class UserService : IUserService
  {
    public UserService() 
    {
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
    }
    public UnderlayingDatabase UnderlayingDatabase { get; }

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