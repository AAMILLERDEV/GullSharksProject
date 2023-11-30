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
    public Task<IEnumerable<EventRegistry>> GetEventRegistry(int user_ID);
    public Task<int?> UpsertEventRegistry(EventRegistry e);

    //Game Reviews
    public Task<IEnumerable<GameReview>> GetGameReviews();
    public Task<int?> UpsertGameReview(GameReview ins);

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
    public Task<bool> DeleteGameByID(int id, int gameDetailsID);
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
    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByGameDetailsID(int gameDetails_ID);

    //Platforms

    public Task<IEnumerable<Platform>> GetPlatforms();

    //Provinces
    public Task<IEnumerable<Province>> GetProvinces();

    //Settings
    public Task<IEnumerable<Setting>> GetSettings();

    //Preferences
    public Task<IEnumerable<PlatformPreference>> GetPlatformPreferences(int user_ID);
    public Task<IEnumerable<LanguagePreference>> GetLanguagePreferences(int user_ID);
    public Task<IEnumerable<CategoryPreference>> GetCategoryPreferences(int user_ID);
    public Task<int?> UpsertLanguagePreference(LanguagePreference lang);
    public Task<int?> UpsertCategoryPreference(CategoryPreference lang);
    public Task<int?> UpsertPlatformPreference(PlatformPreference lang);

    //Card Types
    public Task<IEnumerable<CardType>> GetCardTypes();

    //Cart Items
    public Task<IEnumerable<CartItems>> GetCartItems(int user_ID);
    public Task<int?> UpsertCartItems(CartItems ins);

    //Payment Details
    public Task<IEnumerable<PaymentDetails>> GetPaymentDetailsByUserID(int user_ID);
    public Task<int?> UpsertPaymentDetails(PaymentDetails ins);

    //Friends List 
    public Task<IEnumerable<FriendsList>> GetFriendsListByUserID(int user_ID);
    public Task<IEnumerable<FriendsList>> GetFriendsList();
    public Task<int?> UpsertFriendsList(FriendsList friendsList);

    //Order Details
    public Task<OrderDetails> GetOrderDetailsByID(int id);
    public Task<int?> UpsertOrderDetails(OrderDetails od);

    //Orders
    public Task<IEnumerable<Order>> GetOrdersByUserID(int user_ID);
    public Task<IEnumerable<Order>> GetOrders();
    public Task<int?> UpsertOrder(Order order);

    //Wishlist
    public Task<IEnumerable<Wishlist>> GetWishlistByUserID(int user_ID);
    public Task<IEnumerable<Wishlist>> GetWishlists();
    public Task<int?> UpsertWishlist(Wishlist wishlist);

    //User Games
    public Task<IEnumerable<UserGame>> GetUserGames(int user_ID);
    public Task<int?> UpsertUserGame(UserGame ins);
}