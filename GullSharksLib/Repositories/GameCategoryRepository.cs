using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameCategoryRepository : IGameCategoryRepository
{
    private readonly DBRepository db;

    public GameCategoryRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<GameCategory>> GetGameCategories() => db.GetGameCategories();
}