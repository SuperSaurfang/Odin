using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;

namespace Thor.DatabaseProvider.Repository
{
    public interface IRepository<TEntity, TId> where TEntity : IEntity<TId>
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> Get(TId id);
        Task<TEntity> Update(TEntity model);
        Task<TEntity> Create(TEntity model);
        Task<TEntity> Delete(TId id);
        Task<TEntity> DeleteAll(TEntity model);
    }
}