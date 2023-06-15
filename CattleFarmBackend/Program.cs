using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var origins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();

builder.Services.AddCors(options => 
{
    options.AddPolicy(name: origins,
        policy=>
        {
            policy.
            AllowAnyOrigin().
            AllowAnyHeader().
            AllowAnyMethod();
        }
        );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();

app.UseCors(origins);

app.MapControllers();

app.Run();
