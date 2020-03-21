using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Maria
{
  public class CommentService : ICommentService
  {

    private readonly ISqlExecuterService executer;
    public CommentService(ISqlExecuterService sqlExecuterService)
    {
      executer = sqlExecuterService;
      UnderlayingDatabase = UnderlayingDatabase.MariaDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; } 

    public async Task<IEnumerable<Comment>> GetComments(int articleId)
    {
      const string sql = @"SELECT CommentId, ArticleId, AnswerOf, CommentText, CreationDate, User.UserName 
      FROM Comment, User WHERE Comment.UserId = User.UserId AND ArticleId = @articleId";
      List<Comment> result = (List<Comment>)await executer.ExecuteSql<Comment>(sql, new { articleId = articleId });
      if(result == null) {
        return null;
      }

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

    public Task<Comment> PostComment(Comment comment)
    {
      const string userSql = "INSERT INTO user(userName, userMail, userRank) VALUES (@userName, @userMail, @userRank)";
      const string commentSql = "INSERT INTO Comment(ArticleId, UserId, AnswerOf, CommentText) VALUES (@articleId, @userId, @answerOf, @commentText)";
      throw new NotImplementedException();
    }
  }
}