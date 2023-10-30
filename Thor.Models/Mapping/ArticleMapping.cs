using ArticleDto = Thor.Models.Dto.Article;
using ArticleDb = Thor.Models.Database.Article;
using System.Collections.Generic;
using Thor.Models.Database;
using Thor.Models.Dto.Responses;

namespace Thor.Models.Mapping;

public static class ArticleMapping
{
    public static ArticleDto ToArticleDto(this ArticleDb article)
    {
        var articleDto = new ArticleDto
        {
            ArticleId = article.Id,
            UserId = article.UserId,
            Title = article.Title,
            ArticleText = article.ArticleText,
            CreationDate = article.CreationDate,
            ModificationDate = article.ModificationDate,
            HasCommentsEnabled = article.HasCommentsEnabled,
            HasDateAuthorEnabled = article.HasDateAuthorEnabled,
            Status = article.Status.ToFriendlyString(),
        };

        if (article.IsBlog)
        {
            articleDto.Link = $"/blog/{article.Title}";
        }

        if (article.IsPage)
        {
            articleDto.Link = $"/page/{article.Title}";
        }

        if (article.Comments is not null && article.Comments.Count > 0)
        {
            //articleDto.Comments = article.Comments;
        }

        if (article.Categories is not null  && article.Categories.Count > 0)
        {
            articleDto.Categories = article.Categories.ToCategoryDtos();
        }

        if (article.Tags is not null && article.Tags.Count > 0)
        {
            articleDto.Tags = article.Tags.ToTagDtos();
        }

        return articleDto;
    }

    public static IEnumerable<ArticleDto> ToArticleDto(this IEnumerable<ArticleDb> articles) 
    {
        return articles.ConvertList(a => a.ToArticleDto());
    }

    public static StatusResponse<ArticleDto> ToStatusResponseDto(this StatusResponse<ArticleDb> statusResponse) 
    {
        return new StatusResponse<ArticleDto> 
        {
            Change = statusResponse.Change,
            ResponseType = statusResponse.ResponseType,
            Model = statusResponse.Model.ToArticleDto()
        };
    }

    public static StatusResponse<IEnumerable<ArticleDto>> ToStatusResponseDto(this StatusResponse<IEnumerable<ArticleDb>> statusResponse) 
    {
        return new StatusResponse<IEnumerable<ArticleDto>>
        {
            Change = statusResponse.Change,
            ResponseType = statusResponse.ResponseType,
            Model = statusResponse.Model.ToArticleDto()
        };
    }

    public static ArticleDb ToBlogArticleDb(this ArticleDto article)
    {
        return ToArticleDb(article, isBlog: true);
    }

    public static ArticleDb ToPageArticleDb(this ArticleDto article)
    {
        return ToArticleDb(article, isPage: true);
    }

    private static ArticleDb ToArticleDb(ArticleDto article, bool isBlog = false, bool isPage = false) 
    {
        return new ArticleDb {
            Id = article.ArticleId,
            Title = article.Title,
            ArticleText = article.ArticleText,
            UserId = article.UserId,
            CreationDate = article.CreationDate,
            ModificationDate = article.ModificationDate,
            HasCommentsEnabled = article.HasCommentsEnabled,
            HasDateAuthorEnabled = article.HasDateAuthorEnabled,
            Status = article.Status.ToEnum<ArticleStatus>(),
            IsBlog = isBlog,
            IsPage = isPage
        };
    }
}


