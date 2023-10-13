using Dapper;
using GullSharksLib.Models;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Net;

namespace GullSharksLib;

public class DBRepository : IDBRepository
{
    private string connectionString { get; }

    public DBRepository(string connString)
    {
        connectionString = connString;
    }

    //DB methods for the billingAddress object
    public async Task<BillingAddress> GetBillingAddressByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<BillingAddress>("hist.billingAddressByID_GET", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertBillingAddress(BillingAddress ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@userDetails_ID", ins.UserDetails_ID },
            { "@city", ins.City },
            { "@country_ID", ins.Country_ID },
            { "@province_ID", ins.Province_ID },
            { "@postalCode", ins. PostalCode},
            { "@streetAddress", ins.StreetAddress },
            { "@isDeleted", ins.IsDeleted },
            { "@matchShipping", ins.MatchShipping }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.billingAddress_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    //DB methods for the credential object
    public async Task<int?> UpsertCredentials(Credential ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@credentialValue", ins.CredentialValue },
            { "@userId", ins.User_ID },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.credentials_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the events object
    public async Task<Credential> GetCredentialsByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<Credential>("hist.credentials_GET", new { id }, commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the events object
    public async Task<IEnumerable<Events>> GetEvents()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Events>("hist.events_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<Events> DeleteEventByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<Events>("hist.events_DELETE", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertEvent(Events ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@eventName", ins.EventName },
            { "@description", ins.Description },
            { "@startDate", ins.StartDate },
            { "@endDate", ins.EndDate },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.events_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the gameReview object
    public async Task<IEnumerable<GameReview>> GetGameReviews()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<GameReview>("hist.gameReviews_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertGameReview(GameReview ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@user_ID", ins.User_ID },
            { "@game_ID", ins.Game_ID },
            { "@isApproved", ins.IsApproved },
            { "@description", ins.Description },
            { "@rating_ID", ins.Rating_ID },
            { "@isDeleted", ins.IsDeleted },
            { "@dateAdded", ins.DateAdded}
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.gameReviews_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the rating object
    public async Task<IEnumerable<Rating>> GetRatings()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Rating>("hist.ratings_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertRatings(Rating ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@user_ID", ins.User_ID },
            { "@game_ID", ins.Game_ID},
            { "@rating", ins.RatingNumber },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.ratings_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    //DB methods for the shippingAddress object
    public async Task<ShippingAddress> GetShippingAddressByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<ShippingAddress>("hist.shippingAddressByID_GET", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertShippingAddress(ShippingAddress ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@userDetails_ID", ins.UserDetails_ID },
            { "@city", ins.City },
            { "@country_ID", ins.Country_ID },
            { "@deliveryInstructions", ins.DeliveryInstructions },
            { "@province_ID", ins.Province_ID },
            { "@postalCode", ins. PostalCode},
            { "@streetAddress", ins.StreetAddress },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.shippingAddress_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the userDetail object
    public async Task<IEnumerable<UserDetails>> GetUserDetails()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<UserDetails>("hist.userDetails_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<UserDetails> GetUserDetailsByID(int user_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<UserDetails>("hist.userDetailsByID_GET", new { user_ID }, commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertUserDetails(UserDetails ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@firstName", ins.FirstName},
            { "@lastName", ins.LastName },
            { "@gender", ins.Gender },
            { "@user_ID", ins.User_ID},
            { "@birthDate", ins.BirthDate },
            { "@receivesUpdates", ins.ReceivesUpdates },
            { "@phoneNumber", ins.PhoneNumber },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.userDetails_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the user object
    public async Task<IEnumerable<User>> GetUsers()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<User>("hist.users_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<User> GetUserByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<User>("hist.usersByID_GET", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertUser(User ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@username", ins.Username },
            { "@email", ins.Email },
            { "@credentials_ID", ins.Credentials_ID },
            { "@isAdmin", ins.IsAdmin },
            { "@isValidated", ins.IsValidated },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.users_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the assest object
    public async Task<IEnumerable<Asset>> GetAssets()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Asset>("ref.assets_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the country object
    public async Task<IEnumerable<Country>> GetCountries()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Country>("ref.Countries_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the game object
    public async Task<IEnumerable<Game>> GetGames()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Game>("ref.games_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<bool> DeleteGameByID(int id, int gameDetailsID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<bool>("ref.game_DELETE", new { id, gameDetailsID }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertGame(Game ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@gameName", ins.GameName },
            { "@asset_ID", ins.Asset_ID },
            { "@gameDetail_ID", ins.gameDetail_ID },
            { "@priceInCad", ins.PriceInCAD },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("ref.game_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    public async Task<Game> GetGameByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<Game>("ref.GamesByID_GET", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the gameCategory object
    public async Task<IEnumerable<GameCategory>> GetGameCategories()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<GameCategory>("ref.gameCategories_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the gameDetail object
    public async Task<int?> UpsertGameDetails(GameDetails ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@publisher", ins.Publisher },
            { "@category_ID", ins.Category_ID },
            { "@description", ins.Description },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("ref.gameDetails_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    public async Task<GameDetails> GetGameDetailsByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<GameDetails>("ref.GameDetailsByID_GET", new { id }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<IEnumerable<GameDetails>> GetGameDetails()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<GameDetails>("ref.gameDetails_GET", commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the language object
    public async Task<IEnumerable<Language>> GetLanguages()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Language>("ref.languages_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the platformGameLookUp object
    public async Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByID(int platform_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<PlatformGameLookUp>("ref.platforms_games_lookUpByID_GET", new { platform_ID }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }
    public async Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByGameDetailsID(int gameDetails_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<PlatformGameLookUp>("ref.platforms_games_lookUpByGameDetailsID_GET", new { gameDetails_ID }, commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            return default;
        }
    }
    
    public async Task<int?> UpsertPlatformGameLookUp(PlatformGameLookUp ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@platform_ID", ins.Platform_ID },
            { "@gameDetails_ID", ins.GameDetails_ID },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("ref.platforms_games_lookUp_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    // DB methods for the platform object
    public async Task<IEnumerable<Platform>> GetPlatforms()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Platform>("ref.platforms_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the province object
    public async Task<IEnumerable<Province>> GetProvinces()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Province>("ref.province_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    // DB methods for the setting object
    public async Task<IEnumerable<Setting>> GetSettings()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<Setting>("ref.settings_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }


    // DB methods for preferences
    public async Task<IEnumerable<LanguagePreference>> GetLanguagePreferences(int user_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<LanguagePreference>("hist.languagePref_lookUp_GET", new { user_ID }, commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<IEnumerable<PlatformPreference>> GetPlatformPreferences(int user_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<PlatformPreference>("hist.platformPref_lookUp_GET", new { user_ID }, commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<IEnumerable<CategoryPreference>> GetCategoryPreferences(int user_ID)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<CategoryPreference>("hist.categoryPref_lookUp_GET", new { user_ID }, commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertPlatformPreference(PlatformPreference ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@platform_ID", ins.Platform_ID },
            { "@user_ID", ins.User_ID },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.platformPref_lookUp_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    public async Task<int?> UpsertCategoryPreference(CategoryPreference ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@category_ID", ins.Category_ID },
            { "@user_ID", ins.User_ID },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.categoryPref_lookUp_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }

    public async Task<int?> UpsertLanguagePreference(LanguagePreference ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@language_ID", ins.Language_ID },
            { "@user_ID", ins.User_ID },
            { "@isDeleted", ins.IsDeleted }
        });

        parameters.Add("@insertedID", 0, direction: ParameterDirection.Output);

        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync("hist.languagePref_lookUp_UPSERT", parameters, commandType: CommandType.StoredProcedure);
            insertedID = parameters.Get<int?>("@insertedID");
        }
        catch (Exception ex)
        {
            return default;
        }

        return insertedID ?? ins.ID;
    }
}
