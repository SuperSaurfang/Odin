using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Thor.DatabaseProvider.ContextProvider;
using Dapper;

namespace Thor.DatabaseProvider.Dapper
{
  /// <summary>
  /// SQL Executer for MariaDB and Dapper.
  /// </summary>
  public class MariaSqlExecutor : ISqlExecutor
  {
    private readonly MariaContextProvider contextProvider;
    private readonly ILogger<MariaSqlExecutor> logger;

    public MariaSqlExecutor(ILogger<MariaSqlExecutor> logger, MariaContextProvider provider)
    {
      this.logger = logger;
      contextProvider = provider;
    }

    public async Task<IEnumerable<T>> ExecuteSqlAsync<T>(string sql, object param = null)
    {
      try
      {
        using (var connection = contextProvider.GetContext())
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

    public async Task<int> ExecuteSqlAsync(string sql, object param = null)
    {
      try
      {
        using (var connection = contextProvider.GetContext())
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

    public async Task<T> ExecuteSqlSingleAsync<T>(string sql, object param = null)
    {
      try
      {
        using (var connection = contextProvider.GetContext())
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