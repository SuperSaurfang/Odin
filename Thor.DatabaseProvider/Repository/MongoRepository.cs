using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Thor.DatabaseProvider.ContextProvider;
using Thor.Models;

namespace Thor.DatabaseProvider.Repository
{
  public abstract class MongoRepository<TEntity> : IRepository<TEntity, string> where TEntity : IEntity<string>
  {
    protected readonly MongoContextProvider contextProvider;
    protected readonly ILogger<MongoRepository<TEntity>> logger;
    public MongoRepository(ILogger<MongoRepository<TEntity>> logger,
                          MongoContextProvider contextProvider)
    {
      this.logger = logger;
      this.contextProvider = contextProvider;
    }

    public abstract Task<TEntity> Create(TEntity model);
    public abstract Task<TEntity> Delete(string id);
    public abstract Task<TEntity> DeleteAll(TEntity model);
    public abstract Task<TEntity> Get(string id);
    public abstract Task<IEnumerable<TEntity>> GetAll();
    public abstract Task<TEntity> Update(TEntity model);
  }
}