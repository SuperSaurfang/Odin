using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;
using MongoDB.Driver;
using System.Linq;
using System;

namespace Thor.Services.Mongo
{
  public class CommentService : ICommentService
  {
    public CommentService(IMongoConnectionService connectionService)
    {
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
      Collection = connectionService.GetCollection<Comment>("comment");
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    private IMongoCollection<Comment> Collection { get; }

    public Task<StatusResponse> DeleteComment()
    {
      throw new NotImplementedException();
    }

    public Task<IEnumerable<Comment>> GetComments()
    {
      throw new NotImplementedException();
    }

    public Task<IEnumerable<Comment>> GetPublicComments(int articleId)
    {
      var result = (from c in Collection.AsQueryable() where c.ArticleId == articleId select c).ToList();
      if (result == null)
      {
        return null;
      }

      result.Sort((a, b) => DateTime.Compare(b.CreationDate, a.CreationDate));
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
      result.RemoveAll(m => m.AnswerOf != null);
      result.Reverse();
      return Task.FromResult<IEnumerable<Comment>>(result);
    }

    public Task<StatusResponse> UpdateComment(Comment comment)
    {
      throw new NotImplementedException();
    }

    public Task<StatusResponse> PostComment(Comment comment)
    {
      throw new NotImplementedException();
    }
  }
}