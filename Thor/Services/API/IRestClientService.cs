using Thor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Thor.Services.Api
{
  public interface IRestClientService
  {
    Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery);
     Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery, IEnumerable<string> fields);
  }
}