using Thor.Models.Config;
using Thor.Models.OAuth;

namespace Thor.Models.Mapping;

public static class TokenRequestMapping
{
    public static TokenRequest ToTokenRequest(this RestClientConfig config)
    {
        return new TokenRequest
        {
            ClientId = config.ClientId,
            Audience = $"https://{config.Domain}/api/v2/",
            ClientSecret = config.ClientSecret,
            GrantType = config.GrantType,
        };
    }
}
