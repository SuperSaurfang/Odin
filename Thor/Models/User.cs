using System;

namespace Thor.Models
{
  public class User
  {
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string UserPassword { get; set; }
    public DateTime UserRegisterDate { get; set; }
    public string UserMail { get; set; }
    public string UserRank { get; set; }
    public string UserToken {get; set;}
  }
}