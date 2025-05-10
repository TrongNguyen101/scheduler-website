using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SchedulerAPI.DataContext;
using SchedulerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<RouteOptions>(options => 
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SchedulerContext>();
builder.Services.AddCors();
builder.Services.AddScoped<IUserServices, UserServicescs>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(c =>
    {
        c.RouteTemplate = "swagger/{documentName}/swagger.json";
        c.SerializeAsV2 = true;
    });
    app.UseSwaggerUI();
}

app.UseCors(cors => cors
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
