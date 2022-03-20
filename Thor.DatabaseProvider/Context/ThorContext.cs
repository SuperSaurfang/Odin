using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Context
{
  public partial class ThorContext : DbContext
  {
    private readonly string connectionString;
    public ThorContext()
    {
    }

    public ThorContext(DbContextOptions<ThorContext> options, ConnectionSettings settings)
        : base(options)
    {
      connectionString = settings.GetMariaConnectionString();
    }

    public virtual DbSet<Article> Articles { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<Navmenu> Navmenus { get; set; }
    public virtual DbSet<Tag> Tags { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured && connectionString is not null)
      {
        optionsBuilder
          .UseMySql(connectionString,
            Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.13-mariadb"),
            o =>
            {
              o.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
            }
            );
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.UseCollation("utf8_bin")
          .HasCharSet("utf8");

      modelBuilder.Entity<Article>(entity =>
      {
        entity.ToTable("Article");

        entity.HasIndex(e => e.Title, "title")
                  .IsUnique();

        entity.Property(e => e.ArticleId).HasColumnType("int(11)");

        entity.Property(e => e.CreationDate)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("current_timestamp()");

        entity.Property(e => e.HasCommentsEnabled)
                  .IsRequired()
                  .HasDefaultValueSql("'1'");

        entity.Property(e => e.HasDateAuthorEnabled)
                  .IsRequired()
                  .HasDefaultValueSql("'1'");

        entity.Property(e => e.ModificationDate)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("current_timestamp()");

        entity.Property(e => e.Status)
                  .IsRequired()
                  .HasColumnType("enum('draft','private','public','trash')")
                  .HasDefaultValueSql("'draft'");

        entity.Property(e => e.Title).IsRequired();

        entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasMaxLength(255);

        entity.HasMany(d => d.Categories)
                  .WithMany(p => p.Articles)
                  .UsingEntity<Dictionary<string, object>>(
                      "ArticleCategory",
                      l => l.HasOne<Category>().WithMany().HasForeignKey("CategoryId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("categoryId_category_const"),
                      r => r.HasOne<Article>().WithMany().HasForeignKey("ArticleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("articleId_category_const"),
                      j =>
                      {
                    j.HasKey("ArticleId", "CategoryId").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                    j.ToTable("ArticleCategory");

                    j.HasIndex(new[] { "ArticleId" }, "articleId_category_const");

                    j.HasIndex(new[] { "CategoryId" }, "categoryId_category_const");

                    j.IndexerProperty<int>("ArticleId").HasColumnType("int(11)");

                    j.IndexerProperty<int>("CategoryId").HasColumnType("int(11)");
                  });

        entity.HasMany(d => d.Tags)
                  .WithMany(p => p.Articles)
                  .UsingEntity<Dictionary<string, object>>(
                      "ArticleTag",
                      l => l.HasOne<Tag>().WithMany().HasForeignKey("TagId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("tagid_tag_const"),
                      r => r.HasOne<Article>().WithMany().HasForeignKey("ArticleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("articleId_article_const"),
                      j =>
                      {
                    j.HasKey("ArticleId", "TagId").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                    j.ToTable("ArticleTag");

                    j.HasIndex(new[] { "ArticleId" }, "articleId_article_const");

                    j.HasIndex(new[] { "TagId" }, "tagid_tag_const");

                    j.IndexerProperty<int>("ArticleId").HasColumnType("int(11)");

                    j.IndexerProperty<int>("TagId").HasColumnType("int(11)");
                  });
      });

      modelBuilder.Entity<Category>(entity =>
      {
        entity.ToTable("Category");

        entity.HasIndex(e => e.Name, "Name")
                  .IsUnique();

        entity.HasIndex(e => e.ParentId, "parentId_const");

        entity.Property(e => e.CategoryId).HasColumnType("int(11)");

        entity.Property(e => e.Description).HasMaxLength(255);

        entity.Property(e => e.Name).IsRequired();

        entity.Property(e => e.ParentId).HasColumnType("int(11)");

        entity.HasOne(d => d.Parent)
                  .WithMany(p => p.ChildCategories)
                  .HasForeignKey(d => d.ParentId)
                  .HasConstraintName("parentId_const");
      });

      modelBuilder.Entity<Comment>(entity =>
      {
        entity.ToTable("Comment");

        entity.HasIndex(e => e.AnswerOf, "answerOf_comment_const");

        entity.HasIndex(e => e.ArticleId, "articleId_comment_const");

        entity.Property(e => e.CommentId).HasColumnType("int(11)");

        entity.Property(e => e.AnswerOf).HasColumnType("int(11)");

        entity.Property(e => e.ArticleId).HasColumnType("int(11)");

        entity.Property(e => e.CommentText)
                  .IsRequired()
                  .HasMaxLength(255);

        entity.Property(e => e.CreationDate)
                  .HasColumnType("datetime")
                  .HasDefaultValueSql("current_timestamp()");

        entity.Property(e => e.Status)
                  .IsRequired()
                  .HasColumnType("enum('new','released','trash','spam')")
                  .HasDefaultValueSql("'new'");

        entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasMaxLength(255);

        entity.HasOne(d => d.AnswerOfNavigation)
                  .WithMany(p => p.Replies)
                  .HasForeignKey(d => d.AnswerOf)
                  .OnDelete(DeleteBehavior.SetNull)
                  .HasConstraintName("answerOf_comment_const");

        entity.HasOne(d => d.Article)
                  .WithMany(p => p.Comments)
                  .HasForeignKey(d => d.ArticleId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("articleId_comment_const");
      });

      modelBuilder.Entity<Navmenu>(entity =>
      {
        entity.ToTable("Navmenu");

        entity.HasIndex(e => e.NavmenuOrder, "NavMenuOrder")
                  .IsUnique();

        entity.HasIndex(e => e.ParentId, "parentId_navmenu_const");

        entity.Property(e => e.NavmenuId).HasColumnType("int(11)");

        entity.Property(e => e.DisplayText).HasMaxLength(50);

        entity.Property(e => e.Link).HasMaxLength(255);

        entity.Property(e => e.NavmenuOrder).HasColumnType("int(11)");

        entity.Property(e => e.ParentId).HasColumnType("int(11)");

        entity.HasOne(d => d.Parent)
                  .WithMany(p => p.ChildNavmenu)
                  .HasForeignKey(d => d.ParentId)
                  .HasConstraintName("parentId_navmenu_const");
      });

      modelBuilder.Entity<Tag>(entity =>
      {
        entity.ToTable("Tag");

        entity.HasIndex(e => e.Name, "Name")
                  .IsUnique();

        entity.Property(e => e.TagId).HasColumnType("int(11)");

        entity.Property(e => e.Description).HasMaxLength(255);

        entity.Property(e => e.Name).IsRequired();
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}
