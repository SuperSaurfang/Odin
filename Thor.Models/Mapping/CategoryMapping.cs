using CategoryDto = Thor.Models.Dto.Category;
using CategoryDb = Thor.Models.Database.Category;
using System.Collections.Generic;
using Thor.Models.Dto.Responses;

namespace Thor.Models.Mapping;

public static class CategoryMapping
{
    public static CategoryDto ToCategoryDto(this CategoryDb category)
    {
        var articleDto = new CategoryDto
        {
            CategoryId = category.Id,
            Name = category.Name,
            Description = category.Description,
        };

        if(category.Articles is not null) 
        {
            articleDto.ArticleCount = category.Articles.Count;
        }

        if (category.Parent is not null)
        {
            articleDto.Parent = category.Parent.ToCategoryDto();
        }

        return articleDto;
    }

    public static IEnumerable<CategoryDto> ToCategoryDtos(this IEnumerable<CategoryDb> articles)
    {
        return articles.ConvertList(a => a.ToCategoryDto());
    }

    public static CategoryDb ToCategoryDb(this CategoryDto category)
    {
        var categoryDb = new CategoryDb
        {
            Id = category.CategoryId,
            Name = category.Name,
            Description = category.Description,
        };

        if (category.Parent is not null)
        {
            categoryDb.Parent = category.Parent.ToCategoryDb();
        }

        return categoryDb;
    }

    public static StatusResponse<CategoryDto> ToUpdateResponse(this CategoryDb category)
    {
        var statusResponse = StatusResponse<CategoryDto>.UpdateResponse();
        statusResponse.Change = category is null ? Change.NoChange : Change.Change;
        statusResponse.Model = category.ToCategoryDto();
        return statusResponse;
    }

    public static StatusResponse<CategoryDto> ToCreateResponse(this CategoryDb category)
    {
        var statusResponse = StatusResponse<CategoryDto>.CreateResponse();
        statusResponse.Change = category is null ? Change.NoChange : Change.Change;
        statusResponse.Model = category.ToCategoryDto();
        return statusResponse;
    }

    public static StatusResponse<IEnumerable<CategoryDto>> ToDeleteResponse(this IEnumerable<CategoryDb> categories)
    {
        var statusResponse = StatusResponse<IEnumerable<CategoryDto>>.DeleteResponse();
        statusResponse.Change = categories is null ? Change.NoChange : Change.Change;
        statusResponse.Model = categories.ToCategoryDtos();
        return statusResponse;
    }
}