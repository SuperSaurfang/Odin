using System;
using System.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Thor.Services.Api;

namespace Thor.Services
{
  public class SqlExecuterService : ISqlExecuterService
  {
    private readonly string connectionString;

    public SqlExecuterService(IConfiguration configuration) {
      connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<T>> ExecuteSql<T>(string sql, object param = null)
    {
      try {
        using(var connection = new MySqlConnection(connectionString)) 
        {
          if(connection.State == ConnectionState.Closed) {
            connection.Open();
          }

          if(param == null) 
          {
            return await connection.QueryAsync<T>(sql);  
          } 
          else 
          {
            return await connection.QueryAsync<T>(sql, param); 
          }   
        }
      } catch (Exception ex) {
        Console.WriteLine($"Execption: {ex}");
        return null;
      }
    }

    public async Task<T> ExecuteSqlSingle<T>(string sql, object param = null)
    {
      try {
        using(var connection = new MySqlConnection(connectionString)) 
        {
          if(connection.State == ConnectionState.Closed) {
            connection.Open();
          }

          if(param == null) 
          {
            return await connection.QueryFirstAsync<T>(sql);  
          } 
          else 
          {
            return await connection.QueryFirstAsync<T>(sql, param);  
          }  
        }
      } catch (Exception ex) {
        Console.WriteLine($"Execption: {ex}");
        return default(T);
      }
    }
  }
}