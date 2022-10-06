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
  public TModel Model { get; set;}
}