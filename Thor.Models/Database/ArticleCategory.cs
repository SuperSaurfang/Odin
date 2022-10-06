using DTO = Thor.Models.Dto;

namespace Thor.Models.Database;

public class ArticleCategory
{
  public ArticleCategory() {}
  public ArticleCategory(DTO.ArticleCategory articleCategory)
  {
    ArticleId = articleCategory.ArticleId;
    CategoryId = articleCategory.CategoryId;
  }

  public int ArticleId { get; set; }
  public int CategoryId { get; set; }
  public Article Article { get; set; }
  public Category Category { get; set; }
}