using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Thor.Services.Api;
using Thor.Models.Dto.Responses;
using Thor.Models.Dto.Requests;
using Thor.Models.Dto;
using System;
using Thor.DatabaseProvider.Services.Api;
using Thor.Models.Mapping;

namespace Thor.Services;

internal class DefaultPublicService : IThorPublicService
{
    private const string ARTICLE_STATUS = "public";
    private readonly ILogger<DefaultPublicService> _logger;
    private readonly IThorArticleRepository _articleRepository;
    private readonly IThorCategoryRepository _categoryRepository;
    private readonly IThorTagRepository _tagRepository;
    private readonly IThorNavmenuRepository _navmenuRepository;
    private readonly IThorCommentRepository _commentRepository;

    public DefaultPublicService(ILogger<DefaultPublicService> logger,
      IThorArticleRepository articleRepository,
      IThorCategoryRepository categoryRepository,
      IThorTagRepository tagRepository,
      IThorNavmenuRepository navmenuRepository,
      IThorCommentRepository commentRepository)
    {
        _logger = logger;
        _articleRepository = articleRepository;
        _categoryRepository = categoryRepository;
        _tagRepository = tagRepository;
        _navmenuRepository = navmenuRepository;
        _commentRepository = commentRepository;
    }

    public async Task<ArticleResponse> GetBlog(Paging paging)
    {
      var articles = await _articleRepository.GetArticles()
        .Include(a => a.Categories)
        .Include(a => a.Tags)
        .Where(a => a.Status == Models.Database.ArticleStatus.Public && a.IsBlog == true)
        .OrderByDescending(a => a.CreationDate)
        .ToListAsync();

        return CreateResponse(paging, articles.ToArticleDto().ToList());
    }

    public async Task<ArticleResponse> GetBlogByCategory(ArticleRequest request)
    {
        var articles = await _categoryRepository.GetCategories()
          .Include(s => s.Articles)
            .ThenInclude(s => s.Tags)
          .Include(s => s.Articles)
            .ThenInclude(s => s.Categories)
          .Where(c => c.Name.Equals(request.Name))
          .Select(c => c.Articles)
          .FirstOrDefaultAsync();

        var filtered = articles
          .Where(a => a.Status == Models.Database.ArticleStatus.Public && a.IsBlog == true)
          .OrderByDescending(x => x.CreationDate)
          .ToArticleDto()
          .ToList();

        return CreateResponse(request.Paging, filtered);
    }

    public async Task<ArticleResponse> GetBlogByTag(ArticleRequest request)
    {
        var articles = await _tagRepository.GetTags()
          .Include(s => s.Articles)
            .ThenInclude(s => s.Tags)
          .Include(s => s.Articles)
            .ThenInclude(s => s.Categories)
          .Where(c => c.Name.Equals(request.Name))
          .Select(c => c.Articles)
          .FirstOrDefaultAsync();

        var filtered = articles
          .Where(a => a.Status == Models.Database.ArticleStatus.Public && a.IsBlog == true)
          .OrderByDescending(x => x.CreationDate)
          .ToArticleDto()
          .ToList();

        return CreateResponse(request.Paging, filtered);
    }

    public async Task<Article> GetBlogByTitle(string title)
    {
        var article = await _articleRepository.GetBlogArticle(title);

        if(article.Status != Models.Database.ArticleStatus.Public || !article.IsBlog) 
        {
          throw new InvalidOperationException("This entity isn't public or is not a blog article");
        } 
        return article.ToArticleDto();
    }

    public async Task<Article> GetPage(string title)
    {
        var article = await _articleRepository.GetPageArticle(title);
        
        if(article.Status != Models.Database.ArticleStatus.Public || !article.IsPage) 
        {
          throw new InvalidOperationException("This entity isn't public or is not a page article");
        } 
        return article.ToArticleDto();
    }

    public async Task<IEnumerable<Navmenu>> GetNavMenu()
    {
        var navmenus = await _navmenuRepository.GetNavmenus()
          .OrderBy(x => x.NavmenuOrder)
          .Include(n => n.ChildNavmenu)
          .Where(n => n.Parent == null)
          .ToListAsync();

        return navmenus.ToNavmenuDtos();
    }

    public async Task<Comment> CreateComment(Comment comment)
    {
        try
        {
            // ToDo This need improvement e.q spam detection and much more
            comment.Status = comment.UserId.Equals("guest") ? "new" : "released";
            await _commentRepository.CreateComment(comment.ToCommentDb());
            return _commentRepository.GetComments().FirstOrDefault(i => i.Id == comment.CommentId).ToCommentDto();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception on creating new user comment: ");
            return null;
        }
    }

    public async Task<IEnumerable<Comment>> GetCommentsForArticle(int articleId)
    {
        var comments = await _commentRepository.GetComments()
          .Include(c => c.Replies.Where(c => c.Status == Models.Database.CommentStatus.Released))
          .Where(c => c.Status == Models.Database.CommentStatus.Released && c.Article.Id.Equals(articleId) && c.AnswerOf == null)
          .OrderByDescending(x => x.CreationDate)
          .ToListAsync();

        return comments.ToCommentDtos();
    }

    private static ArticleResponse CreateResponse(Paging paging, List<Article> articles)
    {
        var response = new ArticleResponse();

        var moduloResult = articles.Count % paging.ItemsPerPage;
        if (moduloResult == 0)
        {
            paging.TotalPages = articles.Count / paging.ItemsPerPage;
        }
        else
        {
            var maxItemsForCount = articles.Count - moduloResult + paging.ItemsPerPage;
            paging.TotalPages = maxItemsForCount / paging.ItemsPerPage;
        }

        response.Articles = articles
          .Skip((paging.CurrentPage - 1) * paging.ItemsPerPage)
          .Take(paging.ItemsPerPage);

        response.Paging = paging;
        return response;
    }
}