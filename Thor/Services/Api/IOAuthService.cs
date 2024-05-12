using Refit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.Services.Api;

[Headers("accept: application/json")]
public interface IOAuthService
{
    [Get("/api/v2/users?fields={fields}&q={query}")]
    Task<IEnumerable<User>> GetUsers(string fields, string query);
}
