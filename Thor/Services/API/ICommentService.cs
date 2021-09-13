using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models;
using Thor.Util;

namespace Thor.Services.Api
{
  public interface ICommentService
  {
    UnderlayingDatabase UnderlayingDatabase { get; }
    Task<IEnumerable<Comment>> GetPublicComments(int articleId);
    Task<StatusResponse> PostComment(Comment comment);
    Task<IEnumerable<Comment>> GetComments();
    Task<StatusResponse> UpdateComment(Comment comment);
    Task<StatusResponse> DeleteComment();
    Task<IEnumerable<Article>> GetArticleList();
  }
}