using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria
{
  public class TagService : ITagService
  {
    private ISqlExecuterService executerService;

    public TagService(ISqlExecuterService executerService)
    {
      this.executerService = executerService;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<IEnumerable<Tag>> GetTags()
    {
      const string sql = "SELECT `Tag`.`TagId`, `Name`, `Description`, Count(`ArticleTag`.`ArticleId`) AS `ArticleCount` FROM `Tag` LEFT JOIN `ArticleTag` ON `ArticleTag`.`TagId` = `Tag`.`TagId` GROUP BY `Tag`.`TagId`";
      return await executerService.ExecuteSql<Tag>(sql);
    }
    public async Task<StatusResponse> CreateTag(Tag tag)
    {
      const string sql = "INSERT INTO `Tag`(`Name`, `Description`) VALUES (@Name, @Description)";
      var result = await executerService.ExecuteSql(sql, tag);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> DeleteTag(int id)
    {
      const string sql = "DELETE FROM `Tag` WHERE `TagId` = @id";
      var result = await executerService.ExecuteSql(sql, new { id });
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
    }

    public async Task<StatusResponse> UpdateTag(Tag tag)
    {
      const string sql = "UPDATE `Tag` SET `Name` = @Name, `Description` = @Description WHERE `TagId` = @TagId";
      var result = await executerService.ExecuteSql(sql, tag);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
    }
  }
}