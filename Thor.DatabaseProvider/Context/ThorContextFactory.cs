using System;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Thor.Models.Config;

namespace Thor.DatabaseProvider.Context;

public class ThorContextFactory : IDesignTimeDbContextFactory<ThorContext>
{
    public ThorContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ThorContext>();

        var config = new ConfigurationBuilder()
            .SetBasePath(ConfigBasePath().FullName)
            .AddJsonFile("appsettings.json")
            .Build();

        var databaseConfig = config.GetSection("DatabaseConfig").Get<DatabaseConfig>();
        var connectionString = databaseConfig.ConnectionSettings.GetMariaConnectionString();
        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

        return new ThorContext(optionsBuilder.Options);
    }

    private static DirectoryInfo ConfigBasePath()
    {
        var path = Directory.GetCurrentDirectory();
        var parent = Directory.GetParent(path);
        return parent.GetDirectories().FirstOrDefault(dir => string.Equals(dir.Name, "Thor"));
    }
}