using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameCategoriesRepository
{
    private readonly DBRepository db;

    public GameCategoriesRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<GameCategory>> GetGameCategories() => db.GetGameCategories();
}