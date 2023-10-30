using TagDto = Thor.Models.Dto.Tag;
using TagDb = Thor.Models.Database.Tag;
using System.Collections.Generic;

namespace Thor.Models.Mapping;

public static class TagMapping
{
    public static TagDto ToTagDto(this TagDb tag)
    {
        return new TagDto
        {
            TagId = tag.Id,
            Name = tag.Name,
            Description = tag.Description,
            ArticleCount = tag.Articles.Count
        };
    }

    public static IEnumerable<TagDto> ToTagDtos(this IEnumerable<TagDb> tags) 
    {
        return tags.ConvertList<TagDb, TagDto>(t => t.ToTagDto());
    }

    public static TagDb ToTagDb(this TagDto tag) 
    {
        return new TagDb 
        {
            Id = tag.TagId,
            Name = tag.Name,
            Description = tag.Description,
        };
    }
}