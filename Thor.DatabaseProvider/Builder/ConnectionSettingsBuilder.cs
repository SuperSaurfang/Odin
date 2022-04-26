using Thor.Models.Config;

namespace Thor.DatabaseProvider.Builder
{
  internal class ConnectionSettingsBuilder
  {
    private ConnectionSettings Config { get; set; }
    internal ConnectionSettings Build()
    {
      return Config;
    }

    internal ConnectionSettingsBuilder AddConfig(ConnectionSettings config)
    {
      Config = config;
      return this;
    }
  }
}