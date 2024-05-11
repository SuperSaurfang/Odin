using System.IdentityModel.Tokens.Jwt;
using System;
using System.Threading.Tasks;
using Thor.Models.OAuth;
using Thor.Services.Api;
using Microsoft.Extensions.Logging;
using Thor.Models.Config;
using Thor.Models.Mapping;

namespace Thor.Services.Core;

public class OAuthTokenProvider : IOAuthTokenProvider
{
    private enum ExpirationCheckState
    {
        ExpireSoon,
        NotExpiring,
        UnableRead
    }

    private readonly IOAuthTokenService _tokenService;
    private readonly RestClientConfig _restClientConfig;
    private readonly ILogger<OAuthTokenProvider> _logger;
    private Token _token;

    public OAuthTokenProvider(IOAuthTokenService tokenService, 
        RestClientConfig restClientConfig,
        ILogger<OAuthTokenProvider> logger)
    {
        _tokenService = tokenService;
        _restClientConfig = restClientConfig;
        _logger = logger;
    }
    public async Task<Token> GetAuthToken()
    {
        return CheckTokenExpiration() switch
        {
            ExpirationCheckState.UnableRead or ExpirationCheckState.ExpireSoon => await RefreshToken(),
            ExpirationCheckState.NotExpiring => _token,
            _ => await RefreshToken(),
        };
    }

    private async Task<Token> RefreshToken()
    {
        var response = await _tokenService.GetAuthToken(_restClientConfig.ToTokenRequest());
        if (response.IsSuccessStatusCode)
        {
            _token = response.Content;
        }
        return _token;
    }

    /// <summary>
    /// Check token expiration
    /// </summary>
    /// <returns>Expiration check state</returns>
    private ExpirationCheckState CheckTokenExpiration()
    {
        var now = DateTime.UtcNow;
        var tokenHandler = new JwtSecurityTokenHandler();
        if (_token is not null && tokenHandler.CanReadToken(_token.AccessToken))
        {
            var accessToken = tokenHandler.ReadJwtToken(_token.AccessToken);
            var expiration = accessToken.ValidTo;
            if (now.AddMinutes(10) >= expiration)
            {
                _logger.LogInformation("Token expires soon. Refresh token now.");
                return ExpirationCheckState.ExpireSoon;
            }
            _logger.LogInformation("Token not expired yet.");
            return ExpirationCheckState.NotExpiring;
        }
        _logger.LogWarning("Unable to read token. Get new token.");
        return ExpirationCheckState.UnableRead;
    }
}
