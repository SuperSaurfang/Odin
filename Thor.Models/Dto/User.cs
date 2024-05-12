using System.Text.Json.Serialization;

namespace Thor.Models.Dto;

public class User
{
  [JsonPropertyName("user_id")]
  public string UserId { get; set; }
  
  [JsonPropertyName("nickname")]
  public string Nickname { get; set; }
  
  [JsonPropertyName("picture")]
  public string Picture { get; set; }
}