using Dapper;
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
            { "@isValidated", ins.IsValidated }
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