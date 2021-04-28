namespace Thor.Models
{
  public class Category
  {
    public int CategoryId { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }
}