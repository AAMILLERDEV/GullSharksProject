using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class UserGamesRepository : IUserGamesRepository
{
    private readonly IDBRepository db;

    public UserGamesRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<UserGame>> GetUserGames(int user_ID) => db.GetUserGames(user_ID);
    public Task<int?> UpsertUserGame(UserGame ins) => db.UpsertUserGame(ins);
}

