using System.Collections.Generic;
using System;

namespace Thor.DatabaseProvider.Util;

internal class Utils
{
  public static IEnumerable<TResult> ConvertToDto<TSource, TResult>(IEnumerable<TSource> list, Func<TSource, TResult> newFunc)
  {
    var results = new List<TResult>();
    foreach (var item in list)
    {
      results.Add(newFunc(item));
    }
    return results;
  }
}
