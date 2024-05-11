using System.Threading.Tasks;
using Thor.Models.OAuth;

namespace Thor.Services.Api;

public interface IOAuthTokenProvider
{
    Task<Token> GetAuthToken();
}
