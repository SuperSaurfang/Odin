namespace Thor 
{
  class MongoConnectionSetting 
  {
    public string Host { get; set; }
    public int Port { get; set; }
    public string Database { get; set; }
    public string User { get; set; }
    public string Password { get; set; }

    public string GetConnectionString()
    {
        return $@"mongodb://{User}:{Password}@{Host}:{Port}/{Database}";
    }
  }
}