using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using static System.Net.Mime.MediaTypeNames;

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
    builder.Services.AddSingleton<ICredentialRepository, CredentialRepository>(x => new CredentialRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<ILanguageRepository, LanguageRepository>(x => new LanguageRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IProvinceRepository, ProvinceRepository>(x => new ProvinceRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<ICountryRepository, CountryRepository>(x => new CountryRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IAssetRepository, AssetRepository>(x => new AssetRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IUserDetailsRepository, UserDetailsRepository>(x => new UserDetailsRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IPreferenceRepository, PreferencesRepository>(x => new PreferencesRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IShippingAddressRepository, ShippingAddressRepository>(x => new ShippingAddressRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddSingleton<IBillingAddressRepository, BillingAddressRepository>(x => new BillingAddressRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    //builder.Services.AddSingleton<IPaymentDetailsRepository, PaymentDetailsRepository>(x => new PaymentDetailsRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    //builder.Services.AddSingleton<ICardTypeRepository, CardTypeRepository>(x => new CardTypeRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    //builder.Services.AddSingleton<ICartItemsRepository, CartItemsRepository>(x => new CartItemsRepository(x.GetRequiredService<IOptionsMonitor<AppSetting>>()));
    builder.Services.AddCors(o => o.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    }));

    builder.Services.AddControllers();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    //no comment

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseAuthorization();
    app.UseCors();
    app.MapControllers();

    app.Run();
} catch (Exception ex){
    Console.WriteLine(ex.Message);
}



