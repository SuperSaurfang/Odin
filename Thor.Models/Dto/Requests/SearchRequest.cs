using System;

namespace Thor.Models.Dto.Requests
{
  public class SearchRequest
  {
    public string Term { get; set; }
    public DateTime? Start { get; set; }
    public DateTime? End { get; set; }
    public bool IsTextSearch { get; set; }
    public bool IsTitleSearch { get; set; }
    public bool IsTagSearch { get; set; }
    public bool IsCategorySearch { get; set; }
  }
}