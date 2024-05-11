using Refit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

/*
 * var client = new HttpClient();

 https://sif.eu.auth0.com/api/v2/users?fields=user_id%2Cnickname%2Cpicture&q=user_id%3Agithub%7C16450827
 */


namespace Thor.Services.Api;

[Headers("accept: application/json")]
public interface IOAuthService
{
    [Get("/api/v2/users?fields={fields}&q={query}")]
    Task<IEnumerable<User>> GetUsers(string fields, string query);
}
