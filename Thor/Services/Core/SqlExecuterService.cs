using System;
using System.Data;
using System.Threading.Tasks;
using System.Linq;
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
          return await connection.QueryAsync<T>(sql, param);
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
          return await connection.ExecuteAsync(sql, param);
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return -1;
      }
    }

    public async Task<IEnumerable<T>> ExecuteSql<T, C>(string sql, Func<T, C, T> mapFunc, string splitON, object param = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }
          return await connection.QueryAsync<T, C, T>(sql, mapFunc, param, splitOn: splitON);
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return new List<T>();
      }
    }

    public async Task<IEnumerable<T>> ExecuteSql<T, A, B>(string sql, Func<T, A, B, T> mapFunc, string splitON, object param = null, CommandType? commandType = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }

          return await connection.QueryAsync<T, A, B, T>(sql, mapFunc, param, splitOn: splitON, commandType: commandType);
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return new List<T>();
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

          return await connection.QueryFirstAsync<T>(sql, param);
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return Activator.CreateInstance<T>();
      }
    }

    public async Task<TModel> ExecuteSqlSingle<TModel, AModel, BModel>(string sql, Func<TModel, AModel, BModel, TModel> mapFunc, string splitON, object param = null)
    {
      try
      {
        using (var connection = new MySqlConnection(connectionString))
        {
          if (connection.State == ConnectionState.Closed)
          {
            connection.Open();
          }
          var result = await connection.QueryAsync<TModel, AModel, BModel, TModel>(sql, mapFunc, param, splitOn: splitON);
          return result.FirstOrDefault();
        }
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Unable to execute sql statement.");
        return Activator.CreateInstance<TModel>();
      }
    }
  }
}