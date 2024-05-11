using Refit;
using System.Threading.Tasks;
using Thor.Models.OAuth;

namespace Thor.Services.Api;

[Headers("accept: application/json")]
public interface IOAuthTokenService
{
    [Post("/oauth/token")]
    Task<ApiResponse<Token>> GetAuthToken(TokenRequest request);
}
