using MongoDB.Driver;
using Thor.Services.Api;

namespace Thor.Services
{
  public class MongoConnectionService : IMongoConnectionService
  {
    public MongoConnectionService(MongoConnectionSetting connectionSetting)
    {
      MongoClient = new MongoClient(connectionSetting.GetConnectionString());
      Database = MongoClient.GetDatabase(connectionSetting.Database);
    }

    public MongoClient MongoClient { get; }

    public IMongoDatabase Database { get; }

    public IMongoCollection<T> GetCollection<T>(string name)
    {
      return Database.GetCollection<T>(name);
    }
  }
}