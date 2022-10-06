using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.Services.Api
{
  public interface IRestClientService
  {
    Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery);
     Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery, IEnumerable<string> fields);
  }
}