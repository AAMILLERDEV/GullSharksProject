using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PlatformGameLookUpRepository : IPlatformGameLookUpRepository
{
    private readonly IDBRepository db;

    public PlatformGameLookUpRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp(int platform_ID) => db.GetPlatformGameLookUpByID(platform_ID);
    public Task<int?> UpsertPlatformGameLookUp(PlatformGameLookUp plat) => db.UpsertPlatformGameLookUp(plat);
    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByGameDetailsID(int gameDetails_ID) => db.GetPlatformGameLookUpByGameDetailsID(gameDetails_ID);
}
