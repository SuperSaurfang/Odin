using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;

namespace Thor
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
      try
      {
        logger.Info("Initialize Thor Rest API Application");
        CreateHostBuilder(args).Build().Run();
      }
      catch (Exception exception)
      {
        logger.Error(exception, "Unable to run application. Shutdown now.");
      }
      finally
      {
        LogManager.Shutdown();
      }
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
      return Host.CreateDefaultBuilder(args)
          .ConfigureLogging(logging =>
          {
            logging.ClearProviders();
            logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
          })
          .ConfigureWebHostDefaults(webBuilder =>
          {
            webBuilder.UseStartup<Startup>();
          })
          .UseNLog();
    }
  }
}
