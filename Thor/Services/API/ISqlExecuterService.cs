using System.Collections.Generic;
using System.Threading.Tasks;

namespace Thor.Services.Api {
  public interface ISqlExecuterService
  {
    /// <summary>
    /// Executes a select sql statement and return a Task of an IEnumerable of T.
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="T">A generic type</typeparam>
    /// <returns>A Task of an IEnumerable</returns>
    Task<IEnumerable<T>> ExecuteSql<T>(string sql, object param = null);

    /// <summary>
    /// Executes a select sql statement and retun a Task of T
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="T">A generic type</typeparam>
    /// <returns>A Task of an IEnumerable</returns>
    Task<T> ExecuteSqlSingle<T>(string sql, object param = null);
  
    /// <summary>
    /// Executes an update, insert or delete sql statement and return the affected rows
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <returns>The affected rows</returns>
    Task<int> ExecuteSql(string sql, object param = null);
  }
}