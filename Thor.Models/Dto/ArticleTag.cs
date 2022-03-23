using DB = Thor.Models.Database;

namespace Thor.Models.Dto;

public class ArticleTag
{
  public int ArticleId { get; set; }
  public int TagId { get; set; }

  public ArticleTag() {}
  public ArticleTag(DB.ArticleTag articleTag) {
    ArticleId = articleTag.ArticleId;
    TagId = articleTag.TagId;
  }
}