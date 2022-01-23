using Dapper;

namespace Thor.Util.ThorSqlBuilder
{
  public class ArtilceSqlBuilder
  {
    public static SqlBuilder.Template CreateAllDashboardQuery() {
      var builder = CreateBuilder();
      builder = AddStatusField(builder);
      builder = AddWhereIsBlog(builder);
      return GetTemplateWithWhere(builder);
    }

    public static SqlBuilder.Template CreateDashboardQuery() {
      var builder = CreateBuilder();
      builder = AddStatusField(builder);
      builder = AddCategoryFields(builder);
      builder = AddTagFields(builder);
      builder = AddWhereIsBlog(builder);
      builder = AddWhereTitle(builder);
      builder = AddCategoryLeftJoin(builder);
      builder = AddTagLeftJoin(builder);
      return GetTemplateWithJoinAndWhere(builder);
    }

    public static SqlBuilder.Template CreateAllPublicQuery() {
      var builder = CreateBuilder();
      builder = AddCategoryFields(builder);
      builder = AddTagFields(builder);
      builder = AddCategoryLeftJoin(builder);
      builder = AddTagLeftJoin(builder);
      builder = AddWhereStatusPublic(builder);
      builder = AddWhereIsBlog(builder);
      return GetTemplateWithJoinAndWhere(builder);
    }

    public static SqlBuilder.Template CreatePublicQuery() {
      var builder = CreateBuilder();
      builder = AddCategoryFields(builder);
      builder = AddTagFields(builder);
      builder = AddCategoryLeftJoin(builder);
      builder = AddTagLeftJoin(builder);
      builder = AddWhereStatusPublic(builder);
      builder = AddWhereIsBlog(builder);
      builder = AddWhereTitle(builder);
      return GetTemplateWithJoinAndWhere(builder);
    }

    private static SqlBuilder CreateBuilder()
    {
      var builder = new SqlBuilder();
      builder.Select("`Article`.`ArticleId`");
      builder.Select("`UserId`");
      builder.Select("`Title`");
      builder.Select("`ArticleText`");
      builder.Select("`CreationDate`");
      builder.Select("`ModificationDate`");
      builder.Select("`HasCommentsEnabled`");
      return builder.Select("`HasDateAuthorEnabled`");
    }

    private static SqlBuilder AddStatusField(SqlBuilder builder)
    {
      return builder.Select("`Status`");
    }

    private static SqlBuilder AddCategoryFields(SqlBuilder builder)
    {
      builder.Select("`Category`.`CategoryId`");
      builder.Select("`Category`.`Name`");
      return builder.Select("`Category`.`Description`");
    }

    private static SqlBuilder AddTagFields(SqlBuilder builder)
    {
      builder.Select("`Tag`.`TagId`");
      builder.Select("`Tag`.`Name`");
      return builder.Select("`Tag`.`Description`");
    }

    private static SqlBuilder AddCategoryLeftJoin(SqlBuilder builder)
    {
      builder.LeftJoin("`ArticleCategory` ON `Article`.`ArticleId`  = `ArticleCategory`.`ArticleId`");
      return builder.LeftJoin("`Category` ON `ArticleCategory`.`CategoryId` = `Category`.`CategoryId`");
    }

    private static SqlBuilder AddTagLeftJoin(SqlBuilder builder)
    {
      builder.LeftJoin("`ArticleTag` ON `Article`.`ArticleId` = `ArticleTag`.`ArticleId`");
      return builder.LeftJoin("`Tag` ON `ArticleTag`.`TagId` = `Tag`.`TagId`");
    }

    private static SqlBuilder AddWhereIsBlog(SqlBuilder builder)
    {
      return builder.Where("IsBlog = 1");
    }

    private static SqlBuilder AddWhereStatusPublic(SqlBuilder builder)
    {
      return builder.Where("Status = 'public'");
    }

    private static SqlBuilder AddWhereTitle(SqlBuilder builder)
    {
      return builder.Where("Title = @title");
    }

    private static SqlBuilder.Template GetTemplateWithWhere(SqlBuilder builder)
    {
      return builder.AddTemplate("SELECT /**select**/ FROM Article /**where**/");
    }

    private static SqlBuilder.Template GetTemplateWithJoinAndWhere(SqlBuilder builder)
    {
      return builder.AddTemplate("SELECT /**select**/ FROM Article /**leftjoin**/ /**where**/");
    }
  }
}