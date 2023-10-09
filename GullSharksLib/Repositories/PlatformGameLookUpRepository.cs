using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PlatformGameLookUpRepository //: IPlatformGameLookUpRepository
{
    private readonly DBRepository db;

    public PlatformGameLookUpRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp() => db.GetPlatformsGamesLookUp();
}
