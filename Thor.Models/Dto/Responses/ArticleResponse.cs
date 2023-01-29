using System.Collections.Generic;

namespace Thor.Models.Dto.Responses;

public class ArticleResponse
{
  public IEnumerable<Article> Articles { get; set; }
  public Paging Paging { get; set; }
}