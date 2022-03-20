using Thor.Models.Attributes;

namespace Thor.Models.Dto;

public class User
{
  [Auth0Field("user_id")]
  public string UserId { get; set; }
  [Auth0Field("nickname")]
  public string Nickname { get; set; }
  [Auth0Field("picture")]
  public string Picture { get; set; }
}