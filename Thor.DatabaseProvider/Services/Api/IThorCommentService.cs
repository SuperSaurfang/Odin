using System.Collections.Generic;
using System.Threading.Tasks;
using Thor.Models.Dto;
using Thor.Models.Dto.Responses;

namespace Thor.DatabaseProvider.Services.Api;

public interface IThorCommentService
{
  Task<IEnumerable<Comment>> GetComments();
  Task<StatusResponse<Comment>> UpdateComment(Comment comment);
  Task<StatusResponse<IEnumerable<Comment>>> DeleteComments();
  Task<StatusResponse<Comment>> CreateComment(Comment comment);
  Task<IEnumerable<Article>> GetArticles();
}