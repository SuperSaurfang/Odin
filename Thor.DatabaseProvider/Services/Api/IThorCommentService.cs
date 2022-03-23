using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCommentService
{
  Task<IEnumerable<Comment>> GetComments();
  Task UpdateComment(Comment comment);
  Task DeleteComments();
  Task<Comment> CreateComment(Comment comment);
  Task<IEnumerable<Article>> GetArticles();
}