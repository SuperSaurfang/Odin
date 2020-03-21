using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria
{
  public class UserService : IUserService
  {
    private readonly ISqlExecuterService executer;
    private readonly IConfiguration configuration;

    public UserService(ISqlExecuterService sqlExecuter, IConfiguration configuration)
    {
      executer = sqlExecuter;
      this.configuration = configuration;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public User Authenticate(User user)
    {
      if (user == null)
      {
        return null;
      }

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("AppSettings:Secret"));
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[] {
          new Claim(ClaimTypes.Name, user.UserId.ToString()),
          new Claim(ClaimTypes.Role, user.UserRank)
        }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      user.UserToken = tokenHandler.WriteToken(token);
      user.UserPassword = null;
      return user;
    }

    public async Task<User> GetUser(string userMail)
    {
      const string sql = "SELECT UserId, UserName, UserRegisterDate, UserPassword, UserMail, UserRank FROM User WHERE UserMail = @userMail";
      return await executer.ExecuteSqlSingle<User>(sql, new { userMail });
    }

  }
}