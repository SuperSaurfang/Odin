namespace Thor.Models.Dto;

public class Category
{
    public int CategoryId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int ArticleCount { get; set; }
    public Category Parent { get; set; }
}