using System;
using System.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using Dapper;
using MySql.Data.MySqlClient;
using Thor.Services.Api;
using Thor.Models.Config;
using Microsoft.Extensions.Logging;

namespace Thor.Services
{
  public class SqlExecuterService : ISqlExecuterService
  {
    private readonly string connectionString;
    private readonly ILogger<SqlExecuterService> logger;

    public SqlExecuterService(ILogger<SqlExecuterService> logger, ConnectionConfig connectionSetting)
    {
      this.logger = logger;
      connectionString = connectionSetting.GetMariaConnectionString();
    }

    public async Task<IEnumerable<T>> ExecuteSql<T>(string sql, object param = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }

          if (param == null)
          {
            return await connection.QueryAsync<T>(sql);
          }
          else
          {
            return await connection.QueryAsync<T>(sql, param);
          }
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return new List<T>();
      }
    }

    public async Task<int> ExecuteSql(string sql, object param = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }

          if (param == null)
          {
            return await connection.ExecuteAsync(sql);
          }
          else
          {
            return await connection.ExecuteAsync(sql, param);
          }
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return -1;
      }
    }

    public async Task<T> ExecuteSqlSingle<T>(string sql, object param = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }

          if (param == null)
          {
            return await connection.QueryFirstAsync<T>(sql);
          }
          else
          {
            return await connection.QueryFirstAsync<T>(sql, param);
          }
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return Activator.CreateInstance<T>();
      }
    }
  }
}