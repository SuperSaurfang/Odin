using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;
using Thor.Models.Database;

namespace Thor.DatabaseProvider.Context;

public partial class ThorContext : DbContext
{
    public ThorContext(DbContextOptions<ThorContext> options)
        : base(options)
    {

    }

    public virtual DbSet<Article> Articles { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<Navmenu> Navmenus { get; set; }
    public virtual DbSet<Tag> Tags { get; set; }
    public virtual DbSet<Settings> Settings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
          .Entity<Settings>()
          .Property(p => p.Value)
          .HasConversion(
            v => JsonSerializer.Serialize(v, new JsonSerializerOptions()),
            v => JsonSerializer.Deserialize<JsonObject>(v, new JsonSerializerOptions())
          );
        base.OnModelCreating(modelBuilder);
    }
}
