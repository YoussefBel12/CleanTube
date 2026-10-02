using System.Text;
using CleanTube.Application.Common.Behaviors;
using CleanTube.Application.Common.Mappings;
using CleanTube.Application.Features.Channels.Commands;
using CleanTube.Application.Interfaces;
using CleanTube.Infrastructure.Data;
using CleanTube.Infrastructure.Identity;
using CleanTube.Infrastructure.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);






// Add services to the container.






//this is the database 
builder.Services.AddDbContext<CleanTubeDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

//adding identity support
builder.Services
    .AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<CleanTubeDbContext>()
    .AddDefaultTokenProviders();


//add scoped for services

builder.Services.AddScoped<IChannelRepository, ChannelRepository>();
builder.Services.AddScoped<IVideoRepository, VideoRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
//this unit of work is just code separated from the 3 repos to save changes
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();

//this one for identity 
builder.Services.AddScoped<IIdentityService, IdentityService>();
//this one for jwt token generation
builder.Services.AddScoped<IJwtService, JwtService>();

//jwt based things
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
//this is registrin automapper 
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(typeof(VideoProfile).Assembly);
});




//Mediiatr
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(
        typeof(CreateChannelCommand).Assembly);

    cfg.AddOpenBehavior(
        typeof(ValidationBehavior<,>));
});

//FluentValidation
builder.Services.AddValidatorsFromAssembly(
    typeof(CreateChannelCommandValidator).Assembly);


//JWT config 
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidateLifetime = true,
         ValidateIssuerSigningKey = true,

         ValidIssuer = builder.Configuration["Jwt:Issuer"],
         ValidAudience = builder.Configuration["Jwt:Audience"],

         IssuerSigningKey = new SymmetricSecurityKey(
             Encoding.UTF8.GetBytes(
                 builder.Configuration["Jwt:Key"]!))
     };

     options.Events = new JwtBearerEvents
     {
         OnAuthenticationFailed = context =>
         {
             Console.WriteLine("=================================");
             Console.WriteLine("JWT AUTHENTICATION FAILED");
             Console.WriteLine(context.Exception.ToString());
             Console.WriteLine("=================================");

             return Task.CompletedTask;
         }
     };
 });









builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// this swagger default one without token support
//builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
            Description = "Enter your JWT token."
        });

    options.AddSecurityRequirement(
        new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference
                    {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
});











var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
