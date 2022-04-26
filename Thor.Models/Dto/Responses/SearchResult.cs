using System.Collections.Generic;
using Thor.Models.Dto;

namespace Thor.Models.Dto.Responses
{
  public class SearchResult
  {
    public SearchResult()
    {
      Articles = new List<Article>();
      CategoryList = new List<Category>();
      TagList = new List<Tag>();
    }
    public IEnumerable<Article> Articles { get; set; }
    public IEnumerable<Category> CategoryList { get; set; }
    public IEnumerable<Tag> TagList { get; set; }
  }
}