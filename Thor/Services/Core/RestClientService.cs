using Thor.Services.Api;
using RestSharp;
using Thor.Models;
using Thor.Models.Config;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace Thor.Services
{
  public class RestClientService : IRestClientService
  {
    private class Token
    {
      [JsonPropertyName("access_token")]
      public string AccessToken { get; set; }

      [JsonPropertyName("token_type")]
      public string TokenType { get; set; }
    }

    private enum ExpirationCheckState
    {
      ExpireSoon,
      NotExpiring,
      UnableRead
    }

    private readonly ILogger<RestClientService> logger;
    private readonly RestClientConfig config;
    private Token token;
    private bool isLastRequestSuccesful = false;

    public RestClientService(ILogger<RestClientService> logger, RestClientConfig config)
    {
      this.logger = logger;
      this.config = config;
      token = new Token();
    }

    /// <summary>
    /// Get User Nicknames from Auth0
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<UserNickname>> GetUserNicknames()
    {
      if (RefreshCheck())
      {
        var restClient = new RestClient($"{ApiUrl}users?fields=user_id%2Cnickname");

        var restRequest = new RestRequest(Method.GET);
        restRequest.AddHeader("authorization", $"{token.TokenType} {token.AccessToken}");

        IRestResponse<IEnumerable<UserNickname>> response = await restClient.ExecuteAsync<IEnumerable<UserNickname>>(restRequest);

        return response.Data;
      }
      return new List<UserNickname>();
    }

    /// <summary>
    /// Get Access token from api
    /// </summary>
    /// <returns></returns>
    private bool GetAccessToken()
    {
      var restClient = new RestClient(TokenUrl);
      var restRequest = new RestRequest(Method.POST);
      restRequest.AddHeader("content-type", "application/json");

      var json = new JObject();
      json.Add("client_id", config.ClientId);
      json.Add("client_secret", config.ClientSecret);
      json.Add("audience", ApiUrl);
      json.Add("grant_type", config.GrantType);

      restRequest.AddParameter("application/json", json.ToString(), ParameterType.RequestBody);

      IRestResponse<Token> response = restClient.Execute<Token>(restRequest);
      isLastRequestSuccesful = response.IsSuccessful;

      if (!response.IsSuccessful)
      {
        logger.LogWarning("Unable ro receive access token");
        token.AccessToken = string.Empty;
        token.TokenType = string.Empty;
        return false;
      }
      token = response.Data;
      return true;
    }

    /// <summary>
    /// Check token expiration
    /// </summary>
    /// <returns>Expiration check state</returns>
    private ExpirationCheckState CheckTokenExpiration()
    {
      var now = DateTime.UtcNow;
      var tokenHandler = new JwtSecurityTokenHandler();
      if (tokenHandler.CanReadToken(token.AccessToken) && token != null)
      {
        var accessToken = tokenHandler.ReadJwtToken(token.AccessToken);
        var expiration = accessToken.ValidTo;
        if (now.AddMinutes(10) >= expiration)
        {
          logger.LogInformation("Token expires soon. Refresh token now.");
          return ExpirationCheckState.ExpireSoon;
        }
        logger.LogInformation("Token not expired yet.");
        return ExpirationCheckState.NotExpiring;
      }
      logger.LogWarning("Unable to read token. Get new token.");
      return ExpirationCheckState.UnableRead;
    }

    /// <summary>
    /// Refresh Check for token
    /// </summary>
    /// <returns></returns>
    private bool RefreshCheck()
    {
      switch (CheckTokenExpiration())
      {
        case ExpirationCheckState.ExpireSoon:
          return GetAccessToken();
        case ExpirationCheckState.NotExpiring:
          if (isLastRequestSuccesful)
          {
            return true;
          }
          else
          {
            return false;
          }
        case ExpirationCheckState.UnableRead:
          if(!isLastRequestSuccesful && token.AccessToken == null)
          {
            return GetAccessToken();
          }
          return false;
        default:
          return false;
      }
    }

    private string ApiUrl { get => $"https://{config.Domain}/api/v2/"; }
    private string TokenUrl { get => $"https://{config.Domain}/oauth/token"; }
  }
}