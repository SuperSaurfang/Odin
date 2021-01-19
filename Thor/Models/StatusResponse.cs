using Thor.Util;

namespace Thor.Models
{
  public class StatusResponse
  {
    public Change Change { get; set; }
    public StatusResponseType ResponseType {get; set;}
    public string Message { get; set; }
  }
}
