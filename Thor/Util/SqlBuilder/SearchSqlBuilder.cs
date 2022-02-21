using DbExtensions;

namespace Thor.Util.ThorSqlBuilder
{
  public static class SearchSqlBuilder
  {
    public static SqlBuilder CreateArticleSearchSql(bool includeText, bool includeTitle)
    {
      var builder = SQL.SELECT("`ArticleId`, `UserId`, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled`, `IsBlog`, `IsPage`")
      .FROM("Article");

      if (includeText && !includeTitle)
      {
        return builder.WHERE("`ArticleText` LIKE @Term");
      }

      if (includeTitle && !includeText)
      {
        return builder.WHERE("`Title` LIKE @Term");
      }

      return builder.WHERE("(`ArticleText` LIKE @Term OR `Title` LIKE @Term)");
    }

    public static SqlBuilder AddFromToDate(SqlBuilder builder, bool includeFromDate, bool includeToDate)
    {
      if (!includeFromDate && !includeToDate)
      {
        return builder;
      }

      if (includeFromDate && !includeToDate)
      {
        return builder.AppendClause("AND", " ", " `CreationDate` >= @From");
      }

      if (includeToDate && !includeFromDate)
      {
        return builder.AppendClause("AND", " ", "`CreationDate` <= @To");
      }

      return builder.AppendClause("AND", " ", "`CreationDate` BETWEEN @From AND @To");
    }

    public static SqlBuilder CreateTagSearchSql()
    {
      return SQL.SELECT("`Tag`.`TagId`, `Name`, `Description`, COUNT(`ArticleTag`.`ArticleId`) AS `ArticleCount`")
        .FROM("`Tag`")
        .LEFT_JOIN("`ArticleTag` ON `Tag`.`TagId` = `ArticleTag`.`TagId`")
        .WHERE("`Name` LIKE @Term")
        .GROUP_BY("`Tag`.`TagId`");
    }

    public static SqlBuilder CreateCategorySearchSql()
    {
      return SQL.SELECT("`Category`.`CategoryId`, `Name`, `Description`, COUNT(`ArticleCategory`.`ArticleId`) AS `ArticleCount`")
        .FROM("`Category`")
        .LEFT_JOIN("`ArticleCategory` ON `Category`.`CategoryId` = `ArticleCategory`.`CategoryId`")
        .WHERE("`Name` LIKE @Term")
        .GROUP_BY("`Category`.`CategoryId`");
    }
  }
}