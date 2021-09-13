using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Thor.DatabaseProvider.Dapper;
using Thor.Models;

namespace Thor.DatabaseProvider.Repository
{
  public abstract class MariaRepoistory<TEntity> : IRepository<TEntity, int> where TEntity : IEntity<int>
  {
    protected readonly ISqlExecutor sqlExecutor;
    protected readonly ILogger<MariaRepoistory<TEntity>> logger;

    public MariaRepoistory(ILogger<MariaRepoistory<TEntity>> logger, ISqlExecutor sqlExecutor)
    {
      this.logger = logger;
      this.sqlExecutor = sqlExecutor;
    }

    public abstract Task<TEntity> Create(TEntity model);
    public abstract Task<TEntity> Delete(int id);
    public abstract Task<TEntity> DeleteAll(TEntity model);
    public abstract Task<TEntity> Get(int id);
    public abstract Task<IEnumerable<TEntity>> GetAll();
    public abstract Task<TEntity> Update(TEntity model);
  }
}