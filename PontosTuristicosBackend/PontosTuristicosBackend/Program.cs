using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.OpenApi.Models;
using PontosTuristicosBackend.Controllers;
using PontosTuristicosBackend.DAL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
{
    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddMvc();

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("cs");
builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseSqlite(connectionString));

builder.Services.AddControllers(options =>
{
    options.RespectBrowserAcceptHeader = true;
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
//builder.Services.AddControllersWithViews();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PontosTuristicos API",
        Description = "Pontos Turísticos do Brasil",
        Version = "v1"
    });
});

var app = builder.Build();

//await AsseguraDBExiste(app.Services, app.Logger);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PontosTuristicos API V1");
    });
}

app.UseHttpsRedirection();

app.UseCors("ApiCorsPolicy");

app.UseAuthorization();

//app.MapDefaultControllerRoute();
//app.MapControllers();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


/*async Task AsseguraDBExiste(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Garantindo que o banco de dados exista e esteja na string de conexão :" +
        " '{connectionString}'", connectionString);
    using var db = services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDBContext>();
    await db.Database.EnsureCreatedAsync();
    await db.Database.MigrateAsync();
}*/