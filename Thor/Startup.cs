using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using Thor.Services;
using Thor.Authorization;
using Thor.Models.Config;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Thor.Services.Api;
using Thor.Services.Maria;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Thor.DatabaseProvider.Extensions;
using Thor.DatabaseProvider;

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
      // set config
      services.Configure<ConnectionConfig>(Configuration.GetSection("DatabaseConfig:ConnectionSettings"));
      services.AddTransient(option => option.GetRequiredService<IOptions<ConnectionConfig>>().Value);

      services.Configure<RestClientConfig>(Configuration.GetSection("RestClient"));
      services.AddTransient(optione => optione.GetRequiredService<IOptions<RestClientConfig>>().Value);

      services.AddSingleton<IRestClientService, RestClientService>();
      services.AddTransient<IFileStoreService, FileStoreService>();

      var databaseConfig = Configuration.GetSection("DatabaseConfig").Get<DatabaseConfig>();
      services.AddDBConnection(databaseConfig);

      services.AddTransient<ISearchService, SearchService>();

      services.AddControllers()
        .AddJsonOptions(o =>
        {
          o.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });


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
            options.TokenValidationParameters = new TokenValidationParameters
            {
              NameClaimType = ClaimTypes.NameIdentifier
            };
        });

      services.AddAuthorization(o =>
      {
        o.AddPolicy("admin", policy => policy.Requirements.Add(new HasPermissionRequirement("admin", domain)));
        o.AddPolicy("author", policy => policy.Requirements.Add(new HasPermissionRequirement("author", domain)));
        o.AddPolicy("user", policy => policy.Requirements.Add(new HasPermissionRequirement("user", domain)));
      });
      services.AddTransient<IAuthorizationHandler, HasPermissionHandler>();

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
          c.WithOrigins("http://localhost").AllowAnyMethod().AllowAnyMethod();
          c.WithOrigins("http://127.0.0.1").AllowAnyMethod().AllowAnyMethod();
        });
      }

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Thor Web API V1");
      });

      app.UseRouting();

      app.UseStaticFiles(new StaticFileOptions {
        FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "uploads")),
        RequestPath = "/files"
      });

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
