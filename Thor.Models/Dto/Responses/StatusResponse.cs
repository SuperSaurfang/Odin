namespace Thor.Models.Dto.Responses;

public enum Change
{
  Change,
  NoChange,
  Error
}

public enum StatusResponseType
{
  Create,
  Update,
  Delete
}


public class StatusResponse<TModel> where TModel : class
{
  public Change Change { get; set; }
  public StatusResponseType ResponseType { get; set; }
  public TModel Model { get; set; }

  public static StatusResponse<TModel> UpdateResponse() 
  {
    return new StatusResponse<TModel> 
    {
      ResponseType = StatusResponseType.Update,
    };
  }

  public static StatusResponse<TModel> CreateResponse() 
  {
    return new StatusResponse<TModel> 
    {
      ResponseType = StatusResponseType.Create,
    };
  }

  public static StatusResponse<TModel> DeleteResponse() 
  {
    return new StatusResponse<TModel> 
    {
      ResponseType = StatusResponseType.Delete,
    };
  }

    public static StatusResponse<TModel> UpdateErrorResponse()
    {
        return new StatusResponse<TModel>
        {
            ResponseType = StatusResponseType.Update,
            Change = Change.Error
        };
    }

    public static StatusResponse<TModel> CreateErrorResponse()
    {
        return new StatusResponse<TModel>
        {
            ResponseType = StatusResponseType.Create,
            Change = Change.Error
        };
    }

    public static StatusResponse<TModel> DeleteErrorResponse()
    {
        return new StatusResponse<TModel>
        {
            ResponseType = StatusResponseType.Delete,
            Change = Change.Error
        };
    }
}