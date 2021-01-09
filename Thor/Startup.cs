using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Thor.Services;
using Thor.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Thor.Services.Api;
using Thor.Services.Maria;
using Microsoft.Extensions.Options;
using Thor.Util;
using Newtonsoft.Json;
using Microsoft.Extensions.Primitives;

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
      var database = Configuration.GetValue<string>("DatabaseSettings:Database").ToLower();
      services.Configure<ConnectionSetting>(Configuration.GetSection("DatabaseSettings:ConnectionSettings"));
      services.AddSingleton(option => option.GetRequiredService<IOptions<ConnectionSetting>>().Value);
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
        })
        .AddNewtonsoftJson(o =>
        {
          o.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        });


      /** deprecated authentication
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
      });*/
      var auth0 = Configuration.GetSection("Auth0");
      var authority = auth0.GetValue<string>("Authority");
      var domain = $"https://{authority}/";
      services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = domain;
            options.Audience = auth0.GetValue<string>("Audience");
        });

      /** deprecated authorization
      services.AddAuthorization(o =>
      {
        o.AddPolicy("UserPolicy",
          policy => policy.RequireRole(UserRank.User, UserRank.Moderator, UserRank.Admin));
        o.AddPolicy("ModeratorPolicy",
          policy => policy.RequireRole(UserRank.Moderator, UserRank.Admin));
        o.AddPolicy("AdminPolicy",
          policy => policy.RequireRole(UserRank.Admin));
      });*/
      services.AddAuthorization(o =>
      {
        o.AddPolicy("Admin", policy => policy.Requirements.Add(new HasPermissionRequirement("Admin", domain)));
        o.AddPolicy("Moderator", policy => policy.Requirements.Add(new HasPermissionRequirement("Moderator", domain)));
        o.AddPolicy("User", policy => policy.Requirements.Add(new HasPermissionRequirement("User", domain)));
      });

      services.AddMvc();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Thor Web API", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IUserService userService)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();

        app.UseCors(c =>
        {
          c.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
          c.WithOrigins("http://localhost").AllowAnyMethod().AllowAnyMethod();
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

      services.AddTransient<IBlogService, BlogService>();
      services.AddTransient<IPageService, PageService>();
      services.AddTransient<INavMenuService, NavMenuService>();
      services.AddTransient<ICommentService, CommentService>();
      services.AddTransient<IUserService, UserService>();
    }

    private void ConfigureMongoDB(IServiceCollection services)
    {

      services.AddSingleton<IMongoConnectionService, MongoConnectionService>();

      services.AddTransient<IBlogService, Thor.Services.Mongo.BlogService>();
      services.AddTransient<ICommentService, Thor.Services.Mongo.CommentService>();
      services.AddTransient<IUserService, Thor.Services.Mongo.UserService>();
    }
  }
}
