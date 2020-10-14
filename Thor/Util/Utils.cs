using System.Threading.Tasks;
using Thor.Models;

namespace Thor.Util
{
    class Utils 
    {
      public static StatusResponse CreateStatusResponse(int result, string message) 
      {
        var statusResponse = new StatusResponse
        {
          Message = message
        };
        if (result >= 1) {
          statusResponse.Change = ChangeResponse.Change;
        }
        else if(result == 0) {
          statusResponse.Change = ChangeResponse.NoChange;
        }
        else {
          statusResponse.Change = ChangeResponse.Error;
        }
        return statusResponse;
      }
    }
}