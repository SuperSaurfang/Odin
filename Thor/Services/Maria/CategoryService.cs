using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria
{
  public class CategoryService : ICategoryService
  {
    private readonly ILogger<CategoryService> logger;
    private readonly ISqlExecuterService sqlExecuter;
    public CategoryService(ILogger<CategoryService> logger, ISqlExecuterService sqlExecuter)
    {
      this.logger = logger;
      this.sqlExecuter = sqlExecuter;
      this.UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }
    public UnderlayingDatabase UnderlayingDatabase {get;}

    public async Task<StatusResponse> CreateCategory(Category category)
    {
      const string sql = "INSERT INTO `Category`(`ParentId`, `Name`, `Description`) VALUES (@ParentId, @Name, @Description)";
      var result = await sqlExecuter.ExecuteSql(sql, category);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    public async Task<StatusResponse> DeleteCategory(int id)
    {
      const string sql = "DELETE FROM `Category` WHERE `CategoryId` = @id";
      var result = await sqlExecuter.ExecuteSql(sql, new { id });
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
    }

    public async Task<IEnumerable<Category>> GetCategories()
    {
      const string sql = @"SELECT `Category`.`CategoryId`, `ParentId`, `Name`, `Description`, COUNT(`ArticleCategory`.`CategoryId`) As ArticleCount 
                          FROM `Category` LEFT JOIN `ArticleCategory` ON `Category`.`CategoryId` = `ArticleCategory`.`CategoryId` 
                          GROUP By `Category`.`CategoryId` ";
      return await sqlExecuter.ExecuteSql<Category>(sql);
    }

    public async Task<StatusResponse> UpdateCategory(Category category)
    {
      const string sql = "UPDATE `Category` SET `ParentId`=@ParentId,`Name`=@Name,`Description`=@Description WHERE `CategoryId` = @CategoryId";
      var result = await sqlExecuter.ExecuteSql(sql, category);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
    }
  }
}