using System.ComponentModel.DataAnnotations;

namespace Thor.Models.Dto;
public class Paging
{
  [Range(1, int.MaxValue)]
  public int CurrentPage { get; set; }
  public int TotalPages { get; set; }

  [Range(1, int.MaxValue)]
  public int ItemsPerPage { get; set; }
}
