using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PlatformGameLookUpRepository
{
    private readonly DBRepository db;

    public PlatformGameLookUpRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp() => db.GetPlatformsGamesLookUp();
}
