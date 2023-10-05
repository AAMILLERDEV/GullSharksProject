using Microsoft.Extensions.Options;

namespace GullSharksLib;

public class GamesRepository
{
    private readonly DBRepository db;

    public GamesRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Game>> GetGames() => db.GetGames();
}