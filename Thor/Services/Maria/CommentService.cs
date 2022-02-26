using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria
{
  public class CommentService : ICommentService
  {
    private readonly ISqlExecuterService executer;
    private readonly IRestClientService restClient;
    public CommentService(ISqlExecuterService sqlExecuterService, IRestClientService restClient)
    {
      executer = sqlExecuterService;
      this.restClient = restClient;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public async Task<StatusResponse> DeleteComment()
    {
      const string sql = "DELETE FROM `Comment` WHERE `Status` = 'trash'";
      var result = await executer.ExecuteSql(sql);
      return Utils.CreateStatusResponse(result, StatusResponseType.Delete);
    }

    public async Task<IEnumerable<Comment>> GetComments()
    {
      const string sql = @"SELECT `CommentId`, `Comment`.`ArticleId`, `Article`.`Title` AS `ArticleTitle`, `Comment`.`UserId`, `AnswerOf`, `CommentText`, `Comment`.`CreationDate`, `Comment`.`Status`
      FROM `Comment`, `Article` WHERE `Article`.`ArticleId` = `Comment`.`ArticleId`";
      var result = await executer.ExecuteSql<Comment>(sql);
      await MapUserIdToAuthor(result);
      return result;
    }

    public async Task<IEnumerable<Comment>> GetPublicComments(int articleId)
    {
      const string sql = @"SELECT `CommentId`, `ArticleId`, `UserId`, `AnswerOf`, `CommentText`, `CreationDate`
      FROM Comment WHERE ArticleId = @articleId AND `Status` = 'released'";
      List<Comment> result = (List<Comment>)await executer.ExecuteSql<Comment>(sql, new { articleId = articleId });
      if(result.Count == 0) {
        return result;
      }

      await MapUserIdToAuthor(result);
      // reverse sort by date to begin with the newest and end with the oldest
      result.Sort((a, b) => DateTime.Compare(b.CreationDate, a.CreationDate));
      // map answers to parent comment or answer
      foreach (var answer in result)
      {
        if (answer.AnswerOf != null)
        {
          var parent = result.Find(p => p.CommentId == answer.AnswerOf);
          if (parent != null)
          {
            if (parent.Answers == null)
            {
              parent.Answers = new List<Comment>();
            }
            parent.Answers.Insert(0, answer);
          }
        }
      }
      //clean up and reverse list again
      result.RemoveAll(m => m.AnswerOf != null);
      result.Reverse();
      return result;
    }

    public async Task<StatusResponse> UpdateComment(Comment comment)
    {
      const string sql = "UPDATE `Comment` SET `CommentText`= @CommentText, `Status`= @Status WHERE `CommentId` = @CommentId";
      var result = await executer.ExecuteSql(sql, comment);
      return Utils.CreateStatusResponse(result, StatusResponseType.Update);
    }

    public async Task<StatusResponse> PostComment(Comment comment)
    {
      comment.UserId.ToLower();
      if(comment.UserId.Equals("guest"))
      {
        comment.Status = "new";
      }
      else
      {
        comment.Status = "released";
      }
      const string sql = @"INSERT INTO `Comment`(`ArticleId`, `UserId`, `AnswerOf`, `CommentText`, `CreationDate`, `Status`)
      VALUES (@ArticleId, @UserId, @AnswerOf, @CommentText, @CreationDate, @Status)";
      var result = await executer.ExecuteSql(sql, comment);
      return Utils.CreateStatusResponse(result, StatusResponseType.Create);
    }

    private async Task MapUserIdToAuthor(IEnumerable<Comment> result)
    {
      const string Item = "guest";
      var listOfSearchQuery = new List<string>() { "user_id:" };
      var uniqueUserIds = result.Select(item => item.UserId).Distinct();
      listOfSearchQuery.AddRange(uniqueUserIds);
      listOfSearchQuery.Remove(Item);
      var nickNames = await restClient.GetUserNicknames(listOfSearchQuery, new List<string>() { "user_id", "nickname", "picture" });
      var query = nickNames.AsQueryable();

      foreach (var item in result)
      {
        if(item.UserId.Equals(Item))
        {
          if(item.User == null) {
            item.User = new User();
          }
          item.User.Nickname = "Guest";
          continue;
        }
        item.User = (from name in query where name.UserId.Equals(item.UserId) select name).FirstOrDefault();
      }
    }

    public Task<IEnumerable<Article>> GetArticleList()
    {
      const string sql = "SELECT `ArticleId`, `Title` FROM `Article` WHERE `HasCommentsEnabled` = 1";
      return executer.ExecuteSql<Article>(sql);
    }
  }
}