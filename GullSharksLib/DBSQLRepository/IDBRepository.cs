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

    //Events
    public Task<int?> UpsertEvent(Events ins);

    //Game Reviews
    public Task<IEnumerable<GameReview>> GetGameReviews();
    public Task<int?> UpsertGameReviews(GameReview ins);

    //Preferences
    public Task<IEnumerable<Preference>> GetPreferences();
    public Task<int?> UpsertPreferences(Preference ins);

    //Ratings
    public Task<IEnumerable<Rating>> GetRatings();
    public Task<int?> UpsertRatings(Rating ins);

}