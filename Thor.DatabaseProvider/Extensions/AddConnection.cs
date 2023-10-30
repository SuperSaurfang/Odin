using System;
using Microsoft.Extensions.DependencyInjection;
using Thor.DatabaseProvider.Builder;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using Thor.DatabaseProvider.Services.Implementations;
using Thor.Models.Config;
using Microsoft.EntityFrameworkCore;

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
          services.AddDbContext<ThorContext>(options => 
          {
            var connectionString = config.ConnectionSettings.GetMariaConnectionString();
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
          });

          services.AddTransient<IThorArticleRepository, DefaultArticleRepository>();
          services.AddTransient<IThorCategoryRepository, DefaultCategoryRepository>();
          services.AddTransient<IThorCommentRepository, DefaultCommentRepository>();
          services.AddTransient<IThorNavmenuRepository, DefaultNavmenuRepository>();
          services.AddTransient<IThorTagRepository, DefaultTagRepository>();
          break;
        case "mongo":
        case "mongodb":
          // maybe mongodb support?!
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