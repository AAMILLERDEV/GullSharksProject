using Dapper;
using GullSharksLib.Models;
using System.Data;
using System.Data.SqlClient;

namespace GullSharksLib;

public class DBRepository : IDBRepository
{
    private string connectionString { get; }

    public DBRepository(string connString)
    {
        connectionString = connString;
    }

    //DB methods for the billingAddress object
    public async Task<User> GetBillingAddressByID(int id)
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryFirstOrDefaultAsync<User>("hist.BillingAddressByID_GET", new { id }, commandType: CommandType.StoredProcedure);
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
            { "@isDeleted", ins.IsDeleted }
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
    public async Task<int?> UpsertCredential(Credential ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@credentailValue", ins.Credential_Value },
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
    public async Task<int?> UpsertEvents(Events ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@eventName", ins.Event_Name },
            { "@description", ins.Description },
            { "@startDate", ins.Start_Date },
            { "@endDate", ins.End_Date },
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
    public async Task<IEnumerable<User>> GetGameReviews()
    {
        try
        {
            using IDbConnection connection = new SqlConnection(connectionString);
            return await connection.QueryAsync<User>("hist.ganeReviews_GET", commandType: CommandType.StoredProcedure);

        }
        catch (Exception ex)
        {
            return default;
        }
    }

    public async Task<int?> UpsertGameReviews(GameReview ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@user_ID", ins.User_ID },
            { "@game_ID", ins.Game_ID },
            { "@isApproved", ins.IsApproved },
            { "@desciption", ins.Description },
            { "@rating_ID", ins.Rating_ID },
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

    //DB methods for the preferences object

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

    public async Task<int?> UpsertUser (User ins)
    {
        int? insertedID = 0;

        var parameters = new DynamicParameters(new Dictionary<string, object>
        {
            { "@id", ins.ID },
            { "@username", ins.Username },
            { "@email", ins.Email },
            { "@credentials_ID", ins.Credentials_ID },
            { "@isAdmin", ins.IsAdmin },
            { "@loginCounter", ins.LoginCounter },
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
}