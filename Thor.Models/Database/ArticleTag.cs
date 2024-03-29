using DTO = Thor.Models.Dto;

namespace Thor.Models.Database;

public class ArticleTag
{
  public ArticleTag() {}

  public ArticleTag(DTO.ArticleTag articleTag)
  {
    ArticleId = articleTag.ArticleId;
    TagId = articleTag.TagId;
  }

  public int ArticleId { get; set; }
  public int TagId { get; set; }
  public Article Article { get; set; }
  public Tag Tag { get; set; }
}