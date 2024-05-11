using System.Text.Json.Serialization;

namespace Thor.Models.OAuth;

public class Token
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
}
