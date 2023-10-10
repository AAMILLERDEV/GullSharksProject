using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameDetailsRepository : IGameDetailsRepository
{
    private readonly IDBRepository db;

    public GameDetailsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<GameDetails>> GetGameDetails() => db.GetGameDetails();
    public Task<int?> UpsertGameDetails(GameDetails gd) => db.UpsertGameDetails(gd);
}
