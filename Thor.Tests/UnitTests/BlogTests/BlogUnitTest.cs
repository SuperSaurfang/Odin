// using DB = Thor.Models.Database;
// using Thor.DatabaseProvider.Context;
// using Microsoft.Extensions.Logging;
// using DTO = Thor.Models.Dto;
// using System.Linq.Expressions;

// namespace Thor.Tests.UnitTests.BlogTests;

// public class BlogUnitTest
// {
//   private DefaultArticleRepository? blogService;
//   private Mock<DbSet<DB.Article>>? mockSet;
//   private Mock<ThorContext>? mockContext;

//   [SetUp]
//   public void Setup()
//   {
//     var data = new BlogFakeData().Articles;
//     mockSet = new Mock<DbSet<DB.Article>>();
//     var mockLogger = new Mock<ILogger<DefaultArticleRepository>>();

//     mockSet.As<IAsyncEnumerable<DB.Article>>()
//       .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
//       .Returns(new AsyncEnumerator<DB.Article>(data.GetEnumerator()));

//     mockSet.As<IQueryable<DB.Article>>().Setup(m => m.Provider).Returns(data.Provider);
//     mockSet.As<IQueryable<DB.Article>>().Setup(m => m.Expression).Returns(data.Expression);
//     mockSet.As<IQueryable<DB.Article>>().Setup(m => m.ElementType).Returns(data.ElementType);
//     mockSet.As<IQueryable<DB.Article>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

//     mockContext = new Mock<ThorContext>();
//     mockContext.Setup(m => m.Articles).Returns(mockSet.Object);
//     blogService = new DefaultBlogService(mockContext.Object, mockLogger.Object);
//   }

//   [Test]
//   public async Task CreateArticleTest()
//   {
//     var result = await blogService!.CreateArticle(new DTO.Article()
//     {
//       ArticleText = "Test Text",
//       Title = "Test Title",
//       HasCommentsEnabled = true,
//       HasDateAuthorEnabled = true,
//       CreationDate = DateTime.Now,
//       ModificationDate = DateTime.Now,
//       UserId = "TestUser",
//       Link = "blog/Test",
//       Status = "draft"
//     });

//     mockSet!.Verify(m => m.AddAsync(It.IsAny<DB.Article>(), CancellationToken.None), Times.Once);
//     mockContext!.Verify(m => m.SaveChangesAsync(CancellationToken.None), Times.Once);
//   }

//   [Test]
//   public async Task GetAllArticlesTest()
//   {
//     var result = await blogService!.GetArticles();

//     Assert.That(result.Count(), Is.EqualTo(6), "All Articles returned.");
//   }
// }

// public class AsyncEnumerable<T> : EnumerableQuery<T>, IAsyncEnumerable<T>, IQueryable<T>
// {
//   public AsyncEnumerable(Expression expression)
//       : base(expression) { }

//   public IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default)
//   {
//     return GetEnumerator();
//   }

//   public IAsyncEnumerator<T> GetEnumerator() =>
//         new AsyncEnumerator<T>(this.AsEnumerable().GetEnumerator());
// }

// public class AsyncEnumerator<T> : IAsyncEnumerator<T>
// {
//   private readonly IEnumerator<T> enumerator;

//   public AsyncEnumerator(IEnumerator<T> enumerator) =>
//       this.enumerator = enumerator ?? throw new ArgumentNullException();

//   public T Current => enumerator.Current;

//   public void Dispose() { }

//   public ValueTask DisposeAsync()
//   {
//     throw new NotImplementedException();
//   }

//   public Task<bool> MoveNext(CancellationToken cancellationToken) =>
//         Task.FromResult(enumerator.MoveNext());

//   public ValueTask<bool> MoveNextAsync()
//   {
//     throw new NotImplementedException();
//   }
// }