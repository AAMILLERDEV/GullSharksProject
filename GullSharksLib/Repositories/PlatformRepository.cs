using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PlatformsRepository
{
    private readonly DBRepository db;

    public PlatformsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Platform>> GetPlatforms() => db.GetPlatforms();
}
