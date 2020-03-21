using System.Collections.Generic;
using System.Threading.Tasks;

namespace Thor.Services.Api {
  public interface ISqlExecuterService
  {
    Task<IEnumerable<T>> ExecuteSql<T>(string sql, object param = null);
    Task<T> ExecuteSqlSingle<T>(string sql, object param = null);
  }
}