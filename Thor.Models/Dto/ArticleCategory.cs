using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class ArticleCategory
{
  public int ArticleId { get; set; }
  public int CategoryId { get; set; }

  public ArticleCategory() {}
  public ArticleCategory(DB.ArticleCategory articleCategory) {
    ArticleId = articleCategory.ArticleId;
    CategoryId = articleCategory.CategoryId;
  }
}