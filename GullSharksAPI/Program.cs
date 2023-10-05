using GullSharksLib;
using Microsoft.Extensions.Options;

try {
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("ConnectionStrings"));

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddSingleton<IUserRepository, UserRepository>(x => new UserRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));

    builder.Services.AddCors(c =>
    {
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
    });

    builder.Services.AddControllers();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    //no comment

    app.UseHttpsRedirection();

    app.UseAuthorization();
    app.UseCors(options => options.AllowAnyOrigin());
    app.MapControllers();

    app.Run();
} catch (Exception ex){
    Console.WriteLine(ex.Message);
}



