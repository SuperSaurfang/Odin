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
      return SQL.SELECT("`TagId`, `Name`, `Description` ")
        .FROM("`Tag`")
        .WHERE("`Name` LIKE @Term");
    }

    public static SqlBuilder CreateCategorySearchSql()
    {
      return SQL.SELECT("`CategoryId`, `Name`, `Description`")
        .FROM("`Category`")
        .WHERE("`Name` LIKE @Term");
    }
  }
}