using System.Collections.Generic;
using Thor.Models.Dto;

namespace Thor.Models
{
  public class SearchResult
  {
    public IEnumerable<Article> Articles { get; set; }
    public IEnumerable<Category> CategoryList { get; set; }
    public IEnumerable<Tag> TagList { get; set; }
  }
}