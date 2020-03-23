using MongoDB.Driver;
namespace Thor.Services.Api
{

  public interface IMongoConnectionService
  {
    MongoClient MongoClient { get; }
    IMongoDatabase Database { get; }

    IMongoCollection<T> GetCollection<T>(string name);
  }
}