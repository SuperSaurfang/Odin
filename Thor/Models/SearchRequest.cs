using System;

namespace Thor.Models
{
  public class SearchRequest
  {
    public string Term { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public bool IsTextSearch { get; set; }
    public bool IsTitleSearch { get; set; }
    public bool IsTagSearch { get; set; }
    public bool IsCategorySearch { get; set; }
  }
}