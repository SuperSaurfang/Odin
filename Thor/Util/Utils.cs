using System.Threading.Tasks;
using Thor.Models;

namespace Thor.Util
{
  class Utils
  {
    /// <summary>
    /// Create a Response for an insert, update or delete operation
    /// </summary>
    /// <param name="affectedRows">The rows that changed</param>
    /// <param name="type">The type of the response</param>
    /// <returns>The status response</returns>
    public static StatusResponse CreateStatusResponse(int affectedRows, StatusResponseType type)
    {
      var response = new StatusResponse
      {
        ResponseType = type
      };

      if (affectedRows == 0)
      {
        //if the SQL Statement is executes successful
        response.Message = "Nothing changed, maybe something went wrong. No Sql Error Occurred";
        response.Change = Change.NoChange;
        return response;
      }

      else if(affectedRows == -1)
      {
        response.Message = "An Error occured. See logs for the error";
        response.Change = Change.Error;
        return response;
      }

      else
      {
        response.Change = Change.Change;
        switch (type)
        {
          case StatusResponseType.Create:
            response.Message = $"{affectedRows} entr{(affectedRows == 1 ? "y" : "ies")} created";
            break;
          case StatusResponseType.Delete:
            response.Message = $"{affectedRows} entr{(affectedRows == 1 ? "y" : "ies")} deleted";
            break;
          case StatusResponseType.Update:
            response.Message = $"{affectedRows} entr{(affectedRows == 1 ? "y" : "ies")} updated";
            break;
          default:
            break;
        }

        return response;
      }
    }
  }
}