using GullSharksLib.Models;

namespace GullSharksLib;

public interface IDBRepository 
{
    //Users
    public Task<IEnumerable<User>> GetUsers();
    public Task<User> GetUserByID(int id);
    public Task<int?> UpsertUser(User ins);

    //Billing Address
    public Task<BillingAddress> GetBillingAddressByID(int id);
    public Task<int?> UpsertBillingAddress(BillingAddress ins);


    //Credentials
    public Task<int?> UpsertCredentials(Credential ins);
    public Task<Credential> GetCredentialsByID(int id);

    //Events
    public Task<int?> UpsertEvent(Events ins);
    public Task<IEnumerable<Events>> GetEvents();
    public Task<Events> DeleteEventByID(int id);

    //Game Reviews
    public Task<IEnumerable<GameReview>> GetGameReviews();
    public Task<int?> UpsertGameReview(GameReview ins);

    //Preferences
    public Task<IEnumerable<Preference>> GetPreferences();
    public Task<Preference> GetPreferencesByID(int id);
    public Task<int?> UpsertPreferences(Preference ins);

    //Ratings
    public Task<IEnumerable<Rating>> GetRatings();
    public Task<int?> UpsertRatings(Rating ins);

    //Shipping Addresses
    public Task<ShippingAddress> GetShippingAddressByID(int id);
    public Task<int?> UpsertShippingAddress(ShippingAddress ins);

    //User Details

    public Task<IEnumerable<UserDetails>> GetUserDetails();
    public Task<UserDetails> GetUserDetailsByID(int id);
    public Task<int?> UpsertUserDetails(UserDetails ins);

    //Assets
    public Task<IEnumerable<Asset>> GetAssets();

    //Countries
    public Task<IEnumerable<Country>> GetCountries();

    //Games
    public Task<IEnumerable<Game>> GetGames();
    public Task<bool> DeleteGameByID(int id, int assetID, int gameDetailsID);
    public Task<int?> UpsertGame(Game ins);
    public Task<Game> GetGameByID(int id);

    //Game Categories
    public Task<IEnumerable<GameCategory>> GetGameCategories();

    //Game Details
    public Task<int?> UpsertGameDetails(GameDetails ins);
    public Task<GameDetails> GetGameDetailsByID(int id);
    public Task<IEnumerable<GameDetails>> GetGameDetails();


    //Languages
    public Task<IEnumerable<Language>> GetLanguages();

    //PlatformsGamesLookUp
    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByID(int platform_ID);
    public Task<int?> UpsertPlatformGameLookUp(PlatformGameLookUp plat);

    //Platforms

    public Task<IEnumerable<Platform>> GetPlatforms();

    //Provinces
    public Task<IEnumerable<Province>> GetProvinces();

    //Settings
    public Task<IEnumerable<Setting>> GetSettings();

}