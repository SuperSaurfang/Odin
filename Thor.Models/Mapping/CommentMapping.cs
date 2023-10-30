using CommentDto = Thor.Models.Dto.Comment;
using CommentDb = Thor.Models.Database.Comment;
using System.Collections.Generic;
using System;
using System.Linq;
using Thor.Models.Database;

namespace Thor.Models.Mapping;

public static class CommentMapping
{
    private static Dictionary<string, CommentStatus> statusMap = new ()
    {
        { "new", CommentStatus.New },
        { "released", CommentStatus.Released },
        { "spam", CommentStatus.Spam },
        { "trash", CommentStatus.Trash },
    };
    public static CommentDto ToCommentDto(this CommentDb comment)
    {
        var commentDto = new CommentDto
        {
            CommentId = comment.Id,
            UserId = comment.UserId,
            CommentText = comment.CommentText,
            CreationDate = comment.CreationDate,
            Status = comment.Status.MapStatus(),
        };

        if (comment.Article is not null)
        {
            commentDto.Article = comment.Article.ToArticleDto();
        }

        if (comment.Replies.Count > 0)
        {
            commentDto.Replies = comment.Replies.ToCommentDtos();
        }

        return commentDto;
    }

    public static IEnumerable<CommentDto> ToCommentDtos(this IEnumerable<CommentDb> comments)
    {
        return comments.ConvertList(c => c.ToCommentDto());
    }

    public static CommentDb ToCommentDb(this CommentDto comment) 
    {
        return new CommentDb {
            Id = comment.CommentId,
            UserId = comment.User.UserId,
            AnswerOf = comment.AnswerOf.ToCommentDb(),
            CommentText = comment.CommentText,
            CreationDate = DateTime.UtcNow,
            Article = comment.Article.ToBlogArticleDb(),
            Replies = comment.Replies.ToCommentDbs().ToList(),
            Status = comment.Status.MapStatus(),
        };
    }

    public static IEnumerable<CommentDb> ToCommentDbs(this IEnumerable<CommentDto> comments) 
    {
        return comments.ConvertList<CommentDto, CommentDb>(c => c.ToCommentDb());
    }

    private static CommentStatus MapStatus(this string value) {
        if(!statusMap.ContainsKey(value)) {
            throw new ArgumentException(nameof(value));
        }

        return statusMap[value];
    }

    private static string MapStatus(this CommentStatus status) 
    {
        return statusMap.FirstOrDefault(i => i.Value == status).Key;
    }
}