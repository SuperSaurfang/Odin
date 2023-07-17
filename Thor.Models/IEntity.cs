namespace Thor.Models
{
    /// <summary>
    /// ID Wrapper Interface for different Database Types,
    /// All Entities should implement this Interface, cause the repository classes Based on
    /// This interface
    /// </summary>
    /// <typeparam name="TId">Type for the id</typeparam>
    public interface IEntity<TId>
  {
    TId Id { get; set; }
  }
}
