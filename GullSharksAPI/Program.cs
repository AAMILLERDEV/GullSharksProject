using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

try {
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("ConnectionStrings"));

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddSingleton<IUserRepository, UserRepository>(x => new UserRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IGameRepository, GameRepository>(x => new GameRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IGameDetailsRepository, GameDetailsRepository>(x => new GameDetailsRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IGameCategoryRepository, GameCategoryRepository>(x => new GameCategoryRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IPlatformRepository, PlatformRepository>(x => new PlatformRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IPlatformGameLookUpRepository, PlatformGameLookUpRepository>(x => new PlatformGameLookUpRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IEventRepository, EventRepository>(x => new EventRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IGameReviewRepository, GameReviewRepository>(x => new GameReviewRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IRatingRepository, RatingRepository>(x => new RatingRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IEmailRepository, EmailRepository>(x => new EmailRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));



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



