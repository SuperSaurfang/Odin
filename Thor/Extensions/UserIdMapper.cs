using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Services.Api;

namespace Thor.Extensions
{
  public static class UserIdMapper
  {
    public static async Task<User> MapUserIdToUser(this IRestClientService restClient, Article result)
    {
      IEnumerable<User> users = await restClient.GetUsers(new List<string>() { "user_id:", result.UserId });
      var query = users.AsQueryable();
      return (from user in query where user.UserId.Equals(result.UserId) select user).FirstOrDefault();
    }

    public static async Task MapUserIdToUser(this IRestClientService restClient, IEnumerable<Article> result)
    {
      var listOfSearchQuery = new List<string>() { "user_id:" };
      var uniqueUserIds = result.Select(item => item.UserId).Distinct();
      listOfSearchQuery.AddRange(uniqueUserIds);
      IEnumerable<User> users = await restClient.GetUsers(listOfSearchQuery);
      var query = users.AsQueryable();

      foreach (var item in result)
      {
        item.User = (from user in query where user.UserId.Equals(item.UserId) select user).FirstOrDefault();
      }
    }

    public static async Task MapUserIdToUser(this IRestClientService restClient, IEnumerable<Comment> comments)
    {
      var listOfSearchQuery = new List<string>() { "user_id:" };
      var uniqueUserIds = SelectUserId(comments).Distinct().ToList();
      uniqueUserIds.Remove("guest");
      //if list is empty after removing the guest id, we don't have to any items to map, so we return here
      if(!uniqueUserIds.Any()) 
      {
        return;
      }

      listOfSearchQuery.AddRange(uniqueUserIds);
      IEnumerable<User> users = await restClient.GetUsers(listOfSearchQuery);
      var query = users.AsQueryable();

      SetUserRecursive(query, comments);
    }

    public static async Task MapUserIdToUser(this IRestClientService restClient, Comment comment)
    {
      await MapUserIdToUser(restClient, new List<Comment>() { comment });
    }


    private static List<string> SelectUserId(IEnumerable<Comment> comments)
    {
      var results = new List<string>();
      foreach (var comment in comments)
      {
        results.Add(comment.UserId);
        if(comment.Replies is not null && comment.Replies.Count() >= 0)
        {
          results.AddRange(SelectUserId(comment.Replies));
        }
      }

      return results;
    }

    private static void SetUserRecursive(IQueryable<User> query, IEnumerable<Comment> comments)
    {
      foreach (var comment in comments)
      {
        comment.User = (from user in query where user.UserId.Equals(comment.UserId) select user).FirstOrDefault();
        if (comment.Replies is not null && comment.Replies.Count() >= 0)
        {
          SetUserRecursive(query, comment.Replies);
        }
      }
    }


  }
}