using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface ICommentService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Comment>> GetComments(int articleId);
    Task<Comment> PostComment(Comment comment);
  }
}