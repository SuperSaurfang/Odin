using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Services.Api;
using Thor.Util;

namespace Thor.Services.Mongo 
{
  public class CommentService : ICommentService
  {
    public CommentService() 
    {
      UnderlayingDatabase = UnderlayingDatabase.MongoDB;
    }

    public UnderlayingDatabase UnderlayingDatabase { get; }

    public Task<IEnumerable<Comment>> GetComments(int articleId)
    {
      throw new System.NotImplementedException();
    }

    public Task<Comment> PostComment(Comment comment)
    {
      throw new System.NotImplementedException();
    }
  }
}