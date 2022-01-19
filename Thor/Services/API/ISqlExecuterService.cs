using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Thor.Services.Api {
  public interface ISqlExecuterService
  {
    /// <summary>
    /// Executes a select sql statement and return a Task of an IEnumerable of T.
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="TModel">A generic model type</typeparam>
    /// <returns>A Task of an IEnumerable of TModel</returns>
    Task<IEnumerable<TModel>> ExecuteSql<TModel>(string sql, object param = null);

    /// <summary>
    /// Executes a select sql statement, with a relationship to an other model
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="mapFunc">Mapping function, to map the models</param>
    /// <param name="splitON">The field we should split and read the second object from</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="TModel">The main generic model type</typeparam>
    /// <typeparam name="AModel">The second generic model type, that should be mapped into the TModel</typeparam>
    /// <returns>A Task of an IEnumerable of TModel</returns>
    Task<IEnumerable<TModel>> ExecuteSql<TModel, AModel>(string sql, Func<TModel, AModel, TModel> mapFunc, string splitON, object param = null);

    /// <summary>
    /// Executes a select sql statement, with a relationship to other models
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="mapFunc">Mapping function, to map the models</param>
    /// <param name="splitON">The field we should split and read the second object from</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="TModel">The main generic model type</typeparam>
    /// <typeparam name="AModel">The second generic model type, that should be mapped into the TModel</typeparam>
    /// <typeparam name="BModel">Same a AModel, would be mapped into the TModel</typeparam>
    /// <returns>A Task of an IEnumerable of TModel</returns>
    Task<IEnumerable<TModel>> ExecuteSql<TModel, AModel, BModel>(string sql, Func<TModel, AModel, BModel, TModel> mapFunc, string splitON, object param = null, CommandType? commandType = null);

    /// <summary>
    /// Executes a select sql statement and retun a Task of T
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="T">A generic type</typeparam>
    /// <returns>A Task of an IEnumerable</returns>
    Task<T> ExecuteSqlSingle<T>(string sql, object param = null);

    /// <summary>
    /// Executes a select sql statement, with a relationship to other models
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="mapFunc">Mapping function, to map the models</param>
    /// <param name="splitON">The field we should split and read the second object from</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <typeparam name="TModel">The main generic model type</typeparam>
    /// <typeparam name="AModel">The second generic model type, that should be mapped into the TModel</typeparam>
    /// <typeparam name="BModel">Same a AModel, would be mapped into the TModel</typeparam>
    /// <returns>A Task of an IEnumerable of TModel</returns>
    Task<TModel> ExecuteSqlSingle<TModel, AModel, BModel>(string sql, Func<TModel, AModel, BModel, TModel> mapFunc, string splitON, object param = null);

    /// <summary>
    /// Executes an update, insert or delete sql statement and return the affected rows
    /// </summary>
    /// <param name="sql">The sql statement</param>
    /// <param name="param">An optional scalar object for sql parameters</param>
    /// <returns>The affected rows</returns>
    Task<int> ExecuteSql(string sql, object param = null);
  }
}