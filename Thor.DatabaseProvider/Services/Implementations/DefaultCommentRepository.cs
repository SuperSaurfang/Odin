using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Thor.DatabaseProvider.Context;
using Thor.DatabaseProvider.Services.Api;
using System;
using Microsoft.Extensions.Logging;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Services.Implementations;

internal class DefaultCommentRepository : IThorCommentRepository
{
    private readonly ThorContext context;
    private readonly ILogger<DefaultCommentRepository> logger;

    public DefaultCommentRepository(ThorContext context, ILogger<DefaultCommentRepository> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public async Task CreateComment(Comment comment)
    {
        try
        {
            context.Comments.Add(comment);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on creating new comment", ex);
        }
    }

    public Comment GetComment(int id) 
    {
        return context.Comments.FirstOrDefault(i => i.Id == id);
    }

    public async Task DeleteComments(IEnumerable<Comment> comments)
    {
        try
        {
            var trash = comments.Where(a => a.Status == CommentStatus.Trash);
            context.Comments.RemoveRange(trash);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on deleting comment", ex);
        }
    }

    public IQueryable<Comment> GetComments()
    {
        return context.Comments.AsQueryable();
    }

    public async Task UpdateComment(Comment comment)
    {
        try
        {
            context.Comments.Update(comment);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError("Error on updating comment", ex);
        }
    }
}