using Lucene.Net.Index;
using Lucene.Net.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Thor.Models.Dto;
using Thor.Services.Api;

namespace Thor.Extensions
{
  public static class UserIdMapper
  {
    public static async Task<User> MapUserIdToUser(this IOAuthService restClient, Article result)
    {
      var users = await restClient.GetUsers(Fields(), GetUserSearchQuery([result.UserId]));
      var query = users.AsQueryable();
      return (from user in query where user.UserId.Equals(result.UserId) select user).FirstOrDefault();
    }

    public static async Task MapUserIdToUser(this IOAuthService restClient, IEnumerable<Article> result)
    {
      var uniqueUserIds = result.Select(item => item.UserId).Distinct();
      IEnumerable<User> users = await restClient.GetUsers(Fields(), GetUserSearchQuery(uniqueUserIds));
      var query = users.AsQueryable();

      foreach (var item in result)
      {
        item.User = (from user in query where user.UserId.Equals(item.UserId) select user).FirstOrDefault();
      }
    }

    public static async Task MapUserIdToUser(this IOAuthService restClient, IEnumerable<Comment> comments)
    {
      var uniqueUserIds = SelectUserId(comments).Distinct().ToList();
      uniqueUserIds.Remove("guest");
      //if list is empty after removing the guest id, we don't have to any items to map, so we return here
      if(!uniqueUserIds.Any()) 
      {
        return;
      }

      IEnumerable<User> users = await restClient.GetUsers(Fields(), GetUserSearchQuery(uniqueUserIds));
      var query = users.AsQueryable();

      SetUserRecursive(query, comments);
    }

    public static async Task MapUserIdToUser(this IOAuthService restClient, Comment comment)
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

    private static string Fields()
    {
        return "user_id,nickname,picture";
    }

        private static string GetUserSearchQuery(IEnumerable<string> userIds)
        {
            var rr = string.Join(" ", userIds);
            var tt = new TermQuery(new Term("user_id", rr));
            return tt.ToString();
        }

  }
}