using ArticleDto = Thor.Models.Dto.Article;
using ArticleDb = Thor.Models.Database.Article;
using System.Collections.Generic;

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
            HasDateAuthorEnabled = article.HasDateAuthorEnabled
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

    public static IEnumerable<ArticleDto> ToArticleDtos(this IEnumerable<ArticleDb> articles) 
    {
        return articles.ConvertList<ArticleDb, ArticleDto>(a => a.ToArticleDto());
    }

    public static ArticleDb ToBlogArticleDb(this ArticleDto article)
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
            IsBlog = true
        };
    }

    public static ArticleDb ToPageArticleDb(this ArticleDto article)
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
            IsPage = true
        };
    }
}


