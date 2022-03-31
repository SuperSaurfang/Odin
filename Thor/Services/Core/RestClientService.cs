using Thor.Services.Api;
using RestSharp;
using Thor.Models;
using Thor.Models.Config;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Text;
using System.Reflection;
using Thor.Models.Dto;
using Thor.Models.Attributes;

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
    private string ApiUrl { get => $"https://{config.Domain}/api/v2/"; }
    private string TokenUrl { get => $"https://{config.Domain}/oauth/token"; }

    public RestClientService(ILogger<RestClientService> logger, RestClientConfig config)
    {
      this.logger = logger;
      this.config = config;
      token = new Token();
    }

    public async Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery)
    {
      var type = typeof(User);
      var fields = type.GetProperties().Select(item =>
      {
        // reflect the fieldnames via attribute, because e.g UserId doesn't exits in Auth0
        var jsonPropertyName = item.GetCustomAttribute<Auth0FieldAttribute>();
        return jsonPropertyName.FieldName;
      });
      return await GetUsers(listOfSearchQuery, fields);
    }

    public async Task<IEnumerable<User>> GetUsers(IEnumerable<string> listOfSearchQuery, IEnumerable<string> fields)
    {
      if (await RefreshCheck())
      {
        string searchQuery = BuildSearchQuery(listOfSearchQuery);
        string includingFields = BuildFieldQuery(fields);
        string url = BuildUrl(searchQuery, includingFields);

        var restClient = new RestClient(url);

        var restRequest = new RestRequest(Method.GET);
        restRequest.AddHeader("authorization", $"{token.TokenType} {token.AccessToken}");

        IRestResponse<IEnumerable<User>> response = await restClient.ExecuteAsync<IEnumerable<User>>(restRequest);

        return response.Data;
      }
      return new List<User>();
    }

    #region Url generation helper
    private string BuildUrl(string searchQuery, string includingFields)
    {
      string url = $"{ApiUrl}users";
      if (searchQuery != string.Empty && includingFields != string.Empty)
      {
        url = $"{url}?{searchQuery}&{includingFields}";
      }
      if (searchQuery != string.Empty && includingFields == string.Empty)
      {
        url = $"{url}?{searchQuery}";
      }
      if (includingFields != string.Empty && searchQuery == string.Empty)
      {
        url = $"{url}?{includingFields}";
      }

      return url;
    }

    private string BuildFieldQuery(IEnumerable<string> fields)
    {
      if (fields.Count() == 0) return string.Empty;

      var builder = new StringBuilder("fields=");
      var joined = string.Join(',', fields);
      builder.Append(joined);
      return builder.ToString();
    }

    public string BuildSearchQuery(IEnumerable<string> searchFields)
    {
      if (searchFields.Count() == 0) return string.Empty;

      var builder = new StringBuilder("q=");
      foreach (var item in searchFields.Select((value, index) => new { value, index }))
      {
        builder.Append(item.value);
        if (item.index != searchFields.Count() && !item.value.EndsWith(":"))
        {
          builder.Append(" ");
        }
      }

      return builder.ToString();
    }
    #endregion

    #region Get token and token refresh helper methods
    /// <summary>
    /// Get Access token from api
    /// </summary>
    /// <returns></returns>
    private async Task<bool> GetAccessToken()
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

      IRestResponse<Token> response = await restClient.ExecuteAsync<Token>(restRequest);
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
    private async Task<bool> RefreshCheck()
    {
      switch (CheckTokenExpiration())
      {
        case ExpirationCheckState.UnableRead:
        case ExpirationCheckState.ExpireSoon:
          return await GetAccessToken();
        case ExpirationCheckState.NotExpiring:
          return isLastRequestSuccesful;
        default:
          return false;
      }
    }
    #endregion
  }
}