using Data;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Services;
using System.Linq;
using System.Net.Mime;
using TFG.RecetasAPI.Hubs;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSignalR();

builder.Services.AddCors();

IConfiguration configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
.Build();

string OpenAIUrl = configuration["OpenAI:Url"];
string OpenAIKey = configuration["OpenAI:Key"];

builder.Services.AddHttpClient<OpenIAServices>(httpClient =>
{
    httpClient.Timeout = new TimeSpan(0,10,0) ;
    httpClient.BaseAddress = new Uri(OpenAIUrl) ;

       httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "*/*");

    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.UserAgent, "RecetasAPI");

    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Authorization, $"Bearer {OpenAIKey}"
        );
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDBContext>(
        options => options.UseSqlServer(configuration.GetConnectionString("cnn"))
    );

builder.Services.Configure<Models.Autenticacion.Secret>(configuration.GetSection("Secret"));
builder.Services.AddTransient<RecetasServices>();
builder.Services.AddTransient<IngredientesServices>();
builder.Services.AddTransient<AutenticacionServices>();
builder.Services.AddTransient<PreferenciasServices>();



var app = builder.Build();

app.Use((context, next) =>
{

    context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
    context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "Origin, X-Requested-With, Content-Type, Accept, Authorization" });
    context.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, DELETE, OPTIONS" });

    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204;
        return Task.CompletedTask;
    }

    // Call the next delegate/middleware in the pipeline
    return next();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();



app.UseRouting();
app.UseCors(cors => cors
.AllowAnyMethod()
.AllowAnyHeader()
.SetIsOriginAllowed(origin => true)
.AllowCredentials()
);


app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<NotificacionHub>("/NotificacionHub").RequireAuthorization().RequireCors("SignalRCorsPolicy");
});

app.UseHttpsRedirection();


app.MapControllers();

app.Run();