using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface IUserService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<User> GetUser(string userMail);
    User Authenticate(User user);
  }
}