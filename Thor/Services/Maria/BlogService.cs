using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Thor.Models;
using MySql.Data.MySqlClient;
using Dapper;
using System.Data;
using System.Threading.Tasks;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria 
{
  public class BlogService: IBlogService {

    private readonly ISqlExecuterService executer;

    public BlogService(ISqlExecuterService sqlExecuterService) {
      executer = sqlExecuterService;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<IEnumerable<Article>> GetPublicBlog()
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled` 
      FROM Article, User WHERE Article.UserId = User.UserId AND Status = 'public' AND IsBlog = 1";
      return await executer.ExecuteSql<Article>(sql);
    }

    public async Task<Article> GetSinglePublicPost(string title)
    {
      const string sql = @"SELECT `ArticleId`, User.UserName as Author, `Title`, `ArticleText`, `CreationDate`, `ModificationDate`, `HasCommentsEnabled`, `HasDateAuthorEnabled` 
      FROM Article, User WHERE Article.UserId = User.UserId AND Status = 'public' AND IsBlog = 1 AND Title = @title";
      return await executer.ExecuteSqlSingle<Article>(sql, new {title = title});
    }
  }
}