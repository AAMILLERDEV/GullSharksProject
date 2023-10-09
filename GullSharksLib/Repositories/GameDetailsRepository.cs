using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameDetailsRepository //: IGameCategoryRepository
{
    private readonly DBRepository db;

    public GameDetailsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<GameDetails>> GetGameDetails() => db.GetGameDetails();
}
