using Thor.Attributes;
namespace Thor.Models
{
    public class User
    {
      [Auth0Field("user_id")]
      public string UserId { get; set; }
      [Auth0Field("nickname")]
      public string Nickname { get; set; }
      [Auth0Field("picture")]
      public string Picture { get; set; }
    }
}