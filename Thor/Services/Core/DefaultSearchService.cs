using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto.Responses;
using Thor.Models.Mapping;
using System.Collections.Generic;
using Thor.Services.Api;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Database;

namespace Thor.Services
{
    public class DefaultSearchService : IThorSearchService
    {
        private readonly IThorArticleRepository _articleRepository;
        private readonly IThorCategoryRepository _categoryRepository;
        private readonly IThorTagRepository _tagRepository;

        public DefaultSearchService(IThorArticleRepository articleRepository, 
            IThorCategoryRepository categoryRepository,    
            IThorTagRepository tagRepository)
        {
            _articleRepository = articleRepository;
            _categoryRepository = categoryRepository;
            _tagRepository = tagRepository;
        }

        public async Task<SearchResult> Search(SearchRequest searchRequest)
        {
            var result = new SearchResult();
            if (searchRequest.IsTextSearch || searchRequest.IsTitleSearch)
            {
                var articleQuery = _articleRepository.GetArticles()
                  .Include(a => a.Categories)
                  .Include(a => a.Tags)
                  .Where(a => a.Status == ArticleStatus.Public);

                if (searchRequest.Start is not null)
                {
                    articleQuery = articleQuery.Where(a => a.CreationDate >= searchRequest.Start);
                }
                if (searchRequest.End is not null)
                {
                    articleQuery = articleQuery.Where(a => a.CreationDate <= searchRequest.End);
                }

                if (searchRequest.IsTextSearch && !searchRequest.IsTitleSearch)
                {
                    articleQuery = articleQuery.Where(a => a.ArticleText.Contains(searchRequest.Term));
                }
                if (searchRequest.IsTitleSearch && !searchRequest.IsTextSearch)
                {
                    articleQuery = articleQuery.Where(a => a.Title.Contains(searchRequest.Term));
                }
                if (searchRequest.IsTitleSearch && searchRequest.IsTextSearch)
                {
                    articleQuery = articleQuery.Where(a => a.ArticleText.Contains(searchRequest.Term) || a.Title.Contains(searchRequest.Term));
                }
                var articles = await articleQuery.ToListAsync();
                result.Articles = articles.ToArticleDto();
            }

            if (searchRequest.IsTagSearch)
            {
                var tags = await _tagRepository.GetTags()
                  .Include(t => t.Articles)
                  .Where(t => t.Name.Contains(searchRequest.Term))
                  .ToListAsync();
                result.TagList = tags.ToTagDtos();
            }

            if (searchRequest.IsCategorySearch)
            {
                var categories = await _categoryRepository.GetCategories()
                  .Include(c => c.Articles)
                  .Where(c => c.Name.Contains(searchRequest.Term))
                  .ToListAsync();
                result.CategoryList = categories.ToCategoryDtos();
            }
            return result;
        }
    }
}