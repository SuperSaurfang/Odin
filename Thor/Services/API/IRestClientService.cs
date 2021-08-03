using Thor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Thor.Services.Api
{
  public interface IRestClientService
  {
     Task<IEnumerable<User>> GetUserNicknames();
  }
}