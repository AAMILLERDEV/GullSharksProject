using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;

public class GameRepository : IGameRepository
{
    private readonly DBRepository db;

    public GameRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Game>> GetGames() => db.GetGames();
    public Task<int?> UpsertGame(Game game) => db.UpsertGame(game);
}