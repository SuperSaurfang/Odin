using MongoDB.Driver;
using System;

namespace Thor.DatabaseProvider.ContextProvider
{
  public class MongoContextProvider : IDBContextProvider<MongoClient>
  {
    private readonly string connectionString;
    private readonly string databaseName;
    public MongoContextProvider(ConnectionSettings setting)
    {
      connectionString = setting.GetMongoConnectionString();
      databaseName = setting.Database;
    }
    public MongoClient GetContext()
    {
      return new MongoClient(connectionString);
    }

    public IMongoDatabase GetDatabase(MongoClient client)
    {
      return client.GetDatabase(databaseName);
    }
  }
}