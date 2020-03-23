using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Thor.Services;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Thor.Services.Api;
using Thor.Services.Maria;
using Microsoft.Extensions.Options;

namespace Thor
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // setup database connections
      var database = Configuration.GetValue<string>("ConnectionStrings:DefaultDatabase").ToLower();
      switch (database)
      {
          case "mariadb":
          case "maria":
            ConfigureMariaDB(services);
            break;
          case "mongo":
          case "mongodb":
            // ConfigureMongoDB(services);
            // break;
          default:
            throw new Exception("failed to configure database interface");
      }

      
      services.AddControllers()
        .AddJsonOptions(o =>
        {
          o.JsonSerializerOptions.IgnoreNullValues = true;
        });
        
      var value = Configuration.GetValue<string>("AppSettings:Secret");
      byte[] key = Encoding.ASCII.GetBytes(value);

      services.AddAuthentication(o =>
      {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(o => 
      {
        o.RequireHttpsMetadata = false;
        o.SaveToken = true;
        o.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

      services.AddMvc();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Thor Web API", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();

        app.UseCors(c =>
        {
          c.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
        });
      }

      app.UseDefaultFiles();
      app.UseStaticFiles();
      Console.WriteLine(env.WebRootPath);
      // app.UseHttpsRedirection();

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Thor Web API V1");
      });

      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  
    private void ConfigureMariaDB(IServiceCollection services) 
    {
      services.AddSingleton<ISqlExecuterService, SqlExecuterService>();

      services.AddTransient<IBlogService,  BlogService>();
      services.AddTransient<ICommentService, CommentService>();
      services.AddTransient<IUserService, UserService>();
    }

    private void ConfigureMongoDB(IServiceCollection services) 
    {
      services.Configure<MongoConnectionSetting>(Configuration.GetSection("ConnectionStrings:MongoDB"));
      services.AddSingleton(option => option.GetRequiredService<IOptions<MongoConnectionSetting>>().Value);
      services.AddSingleton<IMongoConnectionService, MongoConnectionService>();

      services.AddTransient<IBlogService, Thor.Services.Mongo.BlogService>();
      services.AddTransient<ICommentService, Thor.Services.Mongo.CommentService>();
      services.AddTransient<IUserService, Thor.Services.Mongo.UserService>();
    }
  }
}
