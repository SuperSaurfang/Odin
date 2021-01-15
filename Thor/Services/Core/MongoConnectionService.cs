using MongoDB.Driver;
using Thor.Services.Api;
using Thor.Models.Config;

namespace Thor.Services
{
  public class MongoConnectionService : IMongoConnectionService
  {
    public MongoConnectionService(ConnectionConfig connectionSetting)
    {
      MongoClient = new MongoClient(connectionSetting.GetMongoConnectionString());
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