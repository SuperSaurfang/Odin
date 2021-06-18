using System;

namespace  Thor.DatabaseProvider.ContextProvider
{
    internal interface IDBContextProvider<TContext> {
      TContext GetContext();
    }
}