namespace Thor.DatabaseProvider
{
  public class DatabaseConfig
  {
    public string DatabaseType { get; set; }
    public ConnectionSettings ConnectionSettings { get; set; }
  }

  public class ConnectionSettings
  {
    public string Host { get; set; }
    public int Port { get; set; }
    public string Database { get; set; }
    public string User { get; set; }
    public string Password { get; set; }

    public string GetMongoConnectionString()
    {
      return $@"mongodb://{User}:{Password}@{Host}:{Port}/{Database}";
    }

    public string GetMariaConnectionString()
    {
      return $"Server={Host};Port={Port};Database={Database};Uid={User};password={Password};";
    }
  }
}