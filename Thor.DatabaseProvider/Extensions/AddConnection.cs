using System;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MySql.Data.MySqlClient;
using Thor.DatabaseProvider.Builder;
using Thor.DatabaseProvider.ContextProvider;
using Thor.DatabaseProvider.Dapper;

namespace Thor.DatabaseProvider.Extensions
{
  public static class DatabaseConnection
  {
    public static IServiceCollection AddDBConnection(this IServiceCollection services, DatabaseConfig config)
    {
      services.AddDBConnection(builder =>
      {
        builder.AddConfig(config.ConnectionSettings);
      });
      var type = config.DatabaseType.ToLower();
      switch (type)
      {
        case "mariadb":
        case "maria":
          services.AddTransient<MariaContextProvider>();
          services.AddTransient<ISqlExecutor, MariaSqlExecutor>();
          break;
        case "mongo":
        case "mongodb":
          // services.AddTransient<IDBContext<MongoClient>, MongoContext>();
          // ConfigureMongoDB(services);
          // break;
        default:
          throw new Exception("failed to configure database interface");
      }
      return services;
    }

    private static IServiceCollection AddDBConnection(this IServiceCollection services, Action<ConnectionSettingsBuilder> builder)
    {
      return services.AddTransient<ConnectionSettings>(provider =>
      {
        var databaseConfigBuider = new ConnectionSettingsBuilder();
        builder(databaseConfigBuider);
        return databaseConfigBuider.Build();
      });
    }
  }
}