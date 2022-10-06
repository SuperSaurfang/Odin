using System.Collections.Generic;
using System;
using System.Linq;

namespace Thor.DatabaseProvider.Extensions;

internal static class CollectionExtension
{
  public static IEnumerable<TResult> ConvertList<TSource, TResult>(this IEnumerable<TSource> list, Func<TSource, TResult> createFunc)
  {
    var results = new List<TResult>(list.Count());
    foreach (var item in list)
    {
      results.Add(createFunc(item));
    }
    return results;
  }
}
