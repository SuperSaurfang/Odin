namespace Thor.Models.Config
{
  public class RestClientConfig
  {
    public string Url { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string Audience { get; set; }
    public string GrantType { get; set; }
  }
}