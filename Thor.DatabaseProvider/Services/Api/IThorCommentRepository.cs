using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCommentRepository
{
  IQueryable<Comment> GetComments();
  Comment GetComment(int id);
  Task UpdateComment(Comment comment);
  Task DeleteComments(IEnumerable<Comment> comments);
  Task CreateComment(Comment comment);
}