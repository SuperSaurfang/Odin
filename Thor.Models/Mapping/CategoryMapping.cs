using CategoryDto = Thor.Models.Dto.Category;
using CategoryDb = Thor.Models.Database.Category;
using System.Collections.Generic;

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
            ArticleCount = category.Articles.Count,
        };

        if (category.Parent is not null)
        {
            articleDto.Parent = category.Parent.ToCategoryDto();
        }

        return articleDto;
    }

    public static IEnumerable<CategoryDto> ToCategoryDtos(this IEnumerable<CategoryDb> articles)
    {
        return articles.ConvertList<CategoryDb, CategoryDto>(a => a.ToCategoryDto());
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
}